import { SetResetPasswordEmailUseCase } from 'src/application/emails/use-cases/set-reset-password-email.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ForgetPassword } from 'src/domain/auth/entities/forget-password';
import { ConfigProvider } from 'src/domain/core/services/config-provider';
export declare class CreateRequestForPasswordResetUseCase {
    private readonly userService;
    private readonly tokenEngine;
    private readonly configProvider;
    private readonly setResetPasswordEmailUseCase;
    constructor(userService: UsersService, tokenEngine: TokensService, configProvider: ConfigProvider, setResetPasswordEmailUseCase: SetResetPasswordEmailUseCase);
    execute(params: ForgetPassword): Promise<void>;
}
