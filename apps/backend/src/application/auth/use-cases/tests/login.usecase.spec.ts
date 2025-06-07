import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from '../login.usecase';
import { UsersService } from 'src/application/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/users/entities/user';
import { UnauthorizedException } from '@nestjs/common';
import { ERole } from 'src/domain/users/entities/enum-role';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser: User = {
    id: 1,
    userName: 'test@example.com',
    password: 'hashedpassword',
    role: ERole.User,
    member: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    },
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: UsersService,
          useValue: {
            findByUserNameAndPassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useFactory: () => ({
            signAsync: jest.fn().mockResolvedValue('test-token'),
          }),
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return login result on successful login', async () => {
      const findByUserNameAndPasswordSpy = jest
        .spyOn(usersService, 'findByUserNameAndPassword')
        .mockResolvedValue(mockUser);
      const signAsyncSpy = jest.spyOn(jwtService, 'signAsync');

      const result = await useCase.execute({
        email: 'test@example.com',
        password: 'password',
      });

      expect(findByUserNameAndPasswordSpy).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );
      expect(signAsyncSpy).toHaveBeenCalledWith({
        sub: 1,
        username: 'test@example.com',
        role: ERole.User,
      });
      expect(result).toEqual({
        id: 1,
        username: 'test@example.com',
        fullName: 'John Doe',
        role: ERole.User,
        memberId: 1,
        token: 'test-token',
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const findByUserNameAndPasswordSpy = jest
        .spyOn(usersService, 'findByUserNameAndPassword')
        .mockResolvedValue(null);

      await expect(
        useCase.execute({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
      expect(findByUserNameAndPasswordSpy).toHaveBeenCalledWith(
        'test@example.com',
        'wrongpassword',
      );
    });
  });
});
