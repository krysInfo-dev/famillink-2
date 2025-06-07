import { Test, TestingModule } from '@nestjs/testing';
import { VerifyResetPasswordTokenUseCase } from '../verify-reset-password-token.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { User } from 'src/domain/users/entities/user';
import { ERole } from 'src/domain/users/entities/enum-role';

describe('VerifyResetPasswordTokenUseCase', () => {
  let useCase: VerifyResetPasswordTokenUseCase;
  let tokensService: TokensService;

  const mockUser: User = {
    id: 1,
    userName: 'test@example.com',
    password: 'hashedpassword',
    role: ERole.User,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyResetPasswordTokenUseCase,
        {
          provide: TokensService,
          useFactory: () => ({
            getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<VerifyResetPasswordTokenUseCase>(
      VerifyResetPasswordTokenUseCase,
    );
    tokensService = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return user if token is valid', async () => {
      const spy = jest
        .spyOn(
          tokensService,
          'getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid',
        )
        .mockResolvedValue(mockUser);
      const result = await useCase.execute({ token: 'valid-token', userId: 1 });

      expect(spy).toHaveBeenCalledWith('valid-token', 1);
      expect(result).toBe(mockUser);
    });

    it('should return null if token is invalid', async () => {
      const spy = jest
        .spyOn(
          tokensService,
          'getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid',
        )
        .mockResolvedValue(null);
      const result = await useCase.execute({
        token: 'invalid-token',
        userId: 1,
      });

      expect(spy).toHaveBeenCalledWith('invalid-token', 1);
      expect(result).toBeNull();
    });
  });
});
