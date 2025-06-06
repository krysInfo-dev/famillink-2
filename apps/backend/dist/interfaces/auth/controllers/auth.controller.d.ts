import { LoginInfoDto } from '../dtos/login-info.dto';
import { LoggedUserInfoDto } from '../dtos/logged-user-info.dto';
import { LogoutInfoDto } from '../dtos/logout-info.dto';
import { ForgetPasswordDto } from '../dtos/forget-password.dto';
import { VerifyResetPasswordTokenDto } from '../dtos/verify-reset-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { LoginUseCase } from 'src/application/auth/use-cases/login.usecase';
import { LogoutUseCase } from 'src/application/auth/use-cases/logout.usecase';
import { CreateRequestForPasswordResetUseCase } from 'src/application/auth/use-cases/create-request-for-password-reset.usecase';
import { VerifyResetPasswordTokenUseCase } from 'src/application/auth/use-cases/verify-reset-password-token.usecase';
import { UserDto } from 'src/interfaces/users/dtos/user.dto';
import { ResetPasswordUseCase } from 'src/application/auth/use-cases/reset-password.usecase';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly logoutUseCase;
    private readonly createRequestForPasswordResetUseCase;
    private readonly verifyResetPasswordTokenUseCase;
    private readonly resetPasswordUseCase;
    constructor(loginUseCase: LoginUseCase, logoutUseCase: LogoutUseCase, createRequestForPasswordResetUseCase: CreateRequestForPasswordResetUseCase, verifyResetPasswordTokenUseCase: VerifyResetPasswordTokenUseCase, resetPasswordUseCase: ResetPasswordUseCase);
    login(loginInfo: LoginInfoDto): Promise<LoggedUserInfoDto>;
    logout(logoutInfo: LogoutInfoDto): Promise<void>;
    forgetPassword(param: ForgetPasswordDto): Promise<void>;
    verifyResetPasswordToken(param: VerifyResetPasswordTokenDto): Promise<UserDto>;
    resetPassword(param: ResetPasswordDto): Promise<void>;
}
