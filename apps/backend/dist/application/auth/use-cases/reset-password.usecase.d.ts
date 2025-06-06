import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ResetPassword } from 'src/domain/auth/entities/reset-passord';
export declare class ResetPasswordUseCase {
    private readonly tokenEngine;
    private readonly userService;
    constructor(tokenEngine: TokensService, userService: UsersService);
    execute(param: ResetPassword): Promise<void>;
}
