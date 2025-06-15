import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigProvider } from '../src/domain/core/services/config-provider';

class TestConfigProvider extends ConfigProvider {
  private readonly config: { [key: string]: string | number } = {
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

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigProvider)
      .useClass(TestConfigProvider)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
