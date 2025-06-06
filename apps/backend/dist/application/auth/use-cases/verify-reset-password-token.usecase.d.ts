import { TokensService } from 'src/application/users/services/tokens.service';
import { VerifyResetPasswordToken } from 'src/domain/auth/entities/verify-reset-password';
import { User } from 'src/domain/users/entities/user';
export declare class VerifyResetPasswordTokenUseCase {
    private readonly tokenEngine;
    constructor(tokenEngine: TokensService);
    execute(param: VerifyResetPasswordToken): Promise<User | null | undefined>;
}
