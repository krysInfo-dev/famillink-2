import { Test, TestingModule } from '@nestjs/testing';
import { CreateRequestForPasswordResetUseCase } from '../create-request-for-password-reset.usecase';
import { UsersService } from 'src/application/users/services/users.service';
import { TokensService } from 'src/application/users/services/tokens.service';
import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { SetResetPasswordEmailUseCase } from 'src/application/emails/use-cases/set-reset-password-email.usecase';
import { User } from 'src/domain/users/entities/user';
import { ERole } from 'src/domain/users/entities/enum-role';

describe('CreateRequestForPasswordResetUseCase', () => {
  let useCase: CreateRequestForPasswordResetUseCase;
  let usersService: UsersService;
  let tokensService: TokensService;
  let setResetPasswordEmailUseCase: SetResetPasswordEmailUseCase;

  const mockUser: User = {
    id: 1,
    userName: 'test@example.com',
    password: 'hashedpassword',
    role: ERole.User,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRequestForPasswordResetUseCase,
        {
          provide: UsersService,
          useFactory: () => ({
            findByUserName: jest.fn(),
          }),
        },
        {
          provide: TokensService,
          useFactory: () => ({
            createTokenForPasswordReset: jest
              .fn()
              .mockResolvedValue('reset-token'),
          }),
        },
        {
          provide: ConfigProvider,
          useFactory: () => ({
            getNumber: jest.fn().mockReturnValue(3600),
          }),
        },
        {
          provide: SetResetPasswordEmailUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<CreateRequestForPasswordResetUseCase>(
      CreateRequestForPasswordResetUseCase,
    );
    usersService = module.get<UsersService>(UsersService);
    tokensService = module.get<TokensService>(TokensService);
    setResetPasswordEmailUseCase = module.get<SetResetPasswordEmailUseCase>(
      SetResetPasswordEmailUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a password reset token and send an email if users is found', async () => {
      const findByUserNameSpy = jest
        .spyOn(usersService, 'findByUserName')
        .mockResolvedValue(mockUser);
      const createTokenSpy = jest.spyOn(
        tokensService,
        'createTokenForPasswordReset',
      );
      const sendEmailSpy = jest.spyOn(setResetPasswordEmailUseCase, 'execute');

      await useCase.execute({ userName: 'test@example.com' });

      expect(findByUserNameSpy).toHaveBeenCalledWith('test@example.com');
      expect(createTokenSpy).toHaveBeenCalledWith(1, 3600);
      expect(sendEmailSpy).toHaveBeenCalledWith('reset-token', mockUser);
    });

    it('should not do anything if users is not found', async () => {
      const findByUserNameSpy = jest
        .spyOn(usersService, 'findByUserName')
        .mockResolvedValue(null);
      const createTokenSpy = jest.spyOn(
        tokensService,
        'createTokenForPasswordReset',
      );
      const sendEmailSpy = jest.spyOn(setResetPasswordEmailUseCase, 'execute');

      await useCase.execute({ userName: 'notfound@example.com' });

      expect(findByUserNameSpy).toHaveBeenCalledWith('notfound@example.com');
      expect(createTokenSpy).not.toHaveBeenCalled();
      expect(sendEmailSpy).not.toHaveBeenCalled();
    });
  });
});
