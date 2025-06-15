import { Test, TestingModule } from '@nestjs/testing';
import { VerifyTokenIsValidUseCase } from '../verify-token-is-valid.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';

describe('VerifyTokenIsValidUseCase', () => {
  let useCase: VerifyTokenIsValidUseCase;
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyTokenIsValidUseCase,
        {
          provide: TokensService,
          useFactory: () => ({
            isJwtTokenUsed: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<VerifyTokenIsValidUseCase>(VerifyTokenIsValidUseCase);
    tokensService = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return true if token is not used', async () => {
      const spy = jest
        .spyOn(tokensService, 'isJwtTokenUsed')
        .mockResolvedValue(false);
      const result = await useCase.execute('valid-token');

      expect(spy).toHaveBeenCalledWith('valid-token');
      expect(result).toBe(true);
    });

    it('should return false if token is used', async () => {
      const spy = jest
        .spyOn(tokensService, 'isJwtTokenUsed')
        .mockResolvedValue(true);
      const result = await useCase.execute('used-token');

      expect(spy).toHaveBeenCalledWith('used-token');
      expect(result).toBe(false);
    });
  });
});
