import { Test, TestingModule } from '@nestjs/testing';
import { LogoutUseCase } from '../logout.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: TokensService,
          useFactory: () => ({
            addUsedJwtToken: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<LogoutUseCase>(LogoutUseCase);
    tokensService = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call addUsedJwtToken with the correct parameters', async () => {
      const logoutInfo = { token: 'test-token', userId: 1 };
      await useCase.execute(logoutInfo);

      const spy = jest.spyOn(tokensService, 'addUsedJwtToken');
      await useCase.execute(logoutInfo);
      expect(spy).toHaveBeenCalledWith('test-token', 1);
    });
  });
});
