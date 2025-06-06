import { TokensService } from 'src/application/users/services/tokens.service';
export declare class VerifyTokenIsValidUseCase {
    private readonly tokenEngine;
    constructor(tokenEngine: TokensService);
    execute(token: string): Promise<boolean>;
}
