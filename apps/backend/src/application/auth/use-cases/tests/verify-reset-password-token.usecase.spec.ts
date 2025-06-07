import { Test, TestingModule } from '@nestjs/testing';
import { VerifyResetPasswordTokenUseCase } from '../verify-reset-password-token.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { User } from 'src/domain/users/entities/user';
import { ERole } from 'src/domain/users/entities/enum-role';

describe('VerifyResetPasswordTokenUseCase', () => {
  let useCase: VerifyResetPasswordTokenUseCase;
  let tokensService: jest.Mocked<TokensService>;

  const mockUser: User = {
    id: 1,
    userName: 'test@example.com',
    password: 'hashedpassword',
    role: ERole.User,
    inactivated: false,
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tokensServiceMock: jest.Mocked<TokensService> = {
      getUserForTokenWhereUserIdIsAndTokenIsValid: jest.fn(),
      // ajoute d'autres méthodes si nécessaires, selon l'interface de TokensService
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyResetPasswordTokenUseCase,
        {
          provide: TokensService,
          useValue: tokensServiceMock,
        },
      ],
    }).compile();

    useCase = module.get(VerifyResetPasswordTokenUseCase);
    tokensService = module.get(TokensService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return user if token is valid', async () => {
      tokensService.getUserForTokenWhereUserIdIsAndTokenIsValid.mockResolvedValue(
        mockUser,
      );

      const result = await useCase.execute({ token: 'valid-token', userId: 1 });

      expect(
        // eslint-disable-next-line @typescript-eslint/unbound-method
        tokensService.getUserForTokenWhereUserIdIsAndTokenIsValid,
      ).toHaveBeenCalledWith('valid-token', 1);
      expect(result).toBe(mockUser);
    });

    it('should return null if token is invalid', async () => {
      tokensService.getUserForTokenWhereUserIdIsAndTokenIsValid.mockResolvedValue(
        null,
      );

      const result = await useCase.execute({
        token: 'invalid-token',
        userId: 1,
      });

      expect(
        // eslint-disable-next-line @typescript-eslint/unbound-method
        tokensService.getUserForTokenWhereUserIdIsAndTokenIsValid,
      ).toHaveBeenCalledWith('invalid-token', 1);
      expect(result).toBeNull();
    });
  });
});
