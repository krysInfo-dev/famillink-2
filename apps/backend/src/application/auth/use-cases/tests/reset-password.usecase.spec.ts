import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordUseCase } from '../reset-password.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { User } from 'src/domain/users/entities/user';
import { ERole } from 'src/domain/users/entities/enum-role';

describe('ResetPasswordUseCase', () => {
  let useCase: ResetPasswordUseCase;
  let tokensService: TokensService;
  let usersService: UsersService;

  const mockUser: User = {
    id: 1,
    userName: 'test@example.com',
    password: 'oldpassword',
    role: ERole.User,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordUseCase,
        {
          provide: TokensService,
          useFactory: () => ({
            setTokenUsed: jest.fn(),
          }),
        },
        {
          provide: UsersService,
          useFactory: () => ({
            read: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<ResetPasswordUseCase>(ResetPasswordUseCase);
    tokensService = module.get<TokensService>(TokensService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should reset password and update user', async () => {
      const setTokenUsedSpy = jest.spyOn(tokensService, 'setTokenUsed');
      const readUserSpy = jest
        .spyOn(usersService, 'read')
        .mockResolvedValue(mockUser);
      const updateUserSpy = jest.spyOn(usersService, 'update');

      await useCase.execute({
        token: 'reset-token',
        userId: 1,
        newPassword: 'newpassword',
      });

      expect(setTokenUsedSpy).toHaveBeenCalledWith('reset-token');
      expect(readUserSpy).toHaveBeenCalledWith(1);
      expect(mockUser.password).toBe('newpassword');
      expect(updateUserSpy).toHaveBeenCalledWith(mockUser);
    });

    it('should not update user if user is not found', async () => {
      const setTokenUsedSpy = jest.spyOn(tokensService, 'setTokenUsed');
      const readUserSpy = jest
        .spyOn(usersService, 'read')
        .mockResolvedValue(null);
      const updateUserSpy = jest.spyOn(usersService, 'update');

      await useCase.execute({
        token: 'reset-token',
        userId: 1,
        newPassword: 'newpassword',
      });

      expect(setTokenUsedSpy).toHaveBeenCalledWith('reset-token');
      expect(readUserSpy).toHaveBeenCalledWith(1);
      expect(updateUserSpy).not.toHaveBeenCalled();
    });
  });
});
