import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigProvider } from '../src/domain/core/services/config-provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/infrastructure/users/persistance/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../src/infrastructure/core/services/bcrypt.service';
import { ERole } from '../src/domain/users/entities/enum-role';
import { User } from '../src/domain/users/entities/user';
import { LoggedUserInfoDto } from '../src/interfaces/auth/dtos/logged-user-info.dto';
import { TokenEntity } from '../src/infrastructure/users/persistance/typeorm/entities/token.entity';
import { ETokenType } from '../src/domain/users/entities/enum-token-type';

// Test Config Provider to override the default one
class TestConfigProvider extends ConfigProvider {
  private readonly config: { [key: string]: any } = {
    DB_TYPE: 'mysql',
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_USERNAME: 'testuser',
    DB_PASSWORD: 'testpassword',
    DB_DATABASE_NAME: 'tests_famillink',
    DB_SYNCHRONIZE: 'true',
    DB_DROP_SCHEMA: 'true',
    INTERNAL_API_KEY: 'test-api-key',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRATION_TIME: '3600s',
    URL_FRONT: 'http://localhost:4200',
    NEW_USER_LINK_DURATION: 172800000,
    PASSWORD_RESET_LINK_DURATION: 900000,
  };

  getNumber(key: string): number {
    return this.config[key] as number;
  }

  getString(key: string): string {
    return this.config[key] as string;
  }
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<UserEntity>;
  let tokensRepository: Repository<TokenEntity>;
  let bcryptService: BcryptService;
  let loginResponse: LoggedUserInfoDto; // Changed to match the actual response structure

  const mockUser = {
    userName: 'test@example.com',
    password: 'password',
    role: ERole.User,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigProvider)
      .useClass(TestConfigProvider)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    usersRepository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    tokensRepository = moduleFixture.get<Repository<TokenEntity>>(
      getRepositoryToken(TokenEntity),
    );
    bcryptService = moduleFixture.get<BcryptService>(BcryptService);

    // Clean up database before tests
    // Now handled by dropSchema: true

    // Create a user for testing
    const hashedPassword = await bcryptService.hashPassword(mockUser.password);
    await usersRepository.save({
      userName: mockUser.userName,
      password: hashedPassword,
      role: mockUser.role,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should return a JWT token on successful login', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: mockUser.userName, password: mockUser.password })
        .expect(200);

      // The response body is expected to be LoggedUserInfoDto
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      const body = response.body as LoggedUserInfoDto;
      expect(body.username).toEqual(mockUser.userName);
      loginResponse = body;
    });

    it('should return 401 for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: mockUser.userName, password: 'wrongpassword' })
        .expect(401);
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should return 200 on logout', () => {
      // Ensure loginResponse is populated from the login test
      if (
        !loginResponse ||
        !loginResponse.token ||
        loginResponse.id === undefined
      ) {
        throw new Error(
          'Login must succeed and provide token and user id before logout test can run.',
        );
      }
      return request(app.getHttpServer())
        .post('/auth/logout')
        .send({ token: loginResponse.token, userId: loginResponse.id })
        .expect(200);
    });
  });

  describe('Password Reset Flow', () => {
    let resetToken: string;

    it('/auth/forget-password (POST) should return 200 and create a reset token', async () => {
      if (!loginResponse || !loginResponse.username) {
        throw new Error(
          'Login must succeed and provide username for forget-password test.',
        );
      }
      await request(app.getHttpServer())
        .post('/auth/forget-password')
        .set('Authorization', `Bearer test-api-key`)
        .send({ userName: mockUser.userName })
        .expect(200);

      // Check that the token was created in the database
      const tokenEntity = await tokensRepository.findOne({
        where: {
          user: { userName: mockUser.userName },
          tokenType: ETokenType.Reset,
        },
      });
      expect(tokenEntity).toBeDefined();
      if (tokenEntity) {
        expect(tokenEntity.tokenType).toEqual(ETokenType.Reset);
        resetToken = tokenEntity.token;
      }
    });

    it('/auth/verify-reset-password-token (POST) should return user info for a valid token', async () => {
      if (!resetToken) {
        throw new Error(
          'Reset token must be defined from the forget-password test.',
        );
      }
      if (!loginResponse || loginResponse.id === undefined) {
        throw new Error(
          'Login must succeed and provide user id for verify-reset-password-token test.',
        );
      }
      const response = await request(app.getHttpServer())
        .post('/auth/verify-reset-password-token')
        .set('Authorization', `Bearer test-api-key`)
        .send({ token: resetToken, userId: loginResponse.id })
        .expect(200);

      const user = response.body as User;
      expect(user.userName).toEqual(loginResponse.username);
    });

    it('/auth/reset-password (POST) should return 200 and change the password', async () => {
      if (!resetToken) {
        throw new Error('Reset token must be defined for reset-password test.');
      }
      if (!loginResponse || loginResponse.id === undefined) {
        throw new Error(
          'Login must succeed and provide user id for reset-password test.',
        );
      }
      await request(app.getHttpServer())
        .post('/auth/reset-password')
        .set('Authorization', `Bearer test-api-key`)
        .send({
          token: resetToken,
          userId: loginResponse.id, // Added missing userId
          newPassword: 'newpassword',
        })
        .expect(200);

      // Try to login with the new password
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: mockUser.userName, password: 'newpassword' })
        .expect(200);
    });
  });
});
