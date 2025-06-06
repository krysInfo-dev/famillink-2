import { Injectable } from '@nestjs/common';
import { SetResetPasswordEmailUseCase } from 'src/application/emails/use-cases/set-reset-password-email.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ForgetPassword } from 'src/domain/auth/entities/forget-password';
import { ConfigProvider } from 'src/domain/core/services/config-provider';

/**
 * Use case for creating a password reset request.
 * This class is responsible for handling the business logic of creating a password reset request.
 * It finds the user by their username, creates a password reset token, and sends an email with the reset link.
 */
@Injectable()
export class CreateRequestForPasswordResetUseCase {
  /**
   * @param {UsersService} userService - The user service to find users.
   * @param {TokensService} tokenEngine - The token service to create password reset tokens.
   * @param {ConfigProvider} configProvider - The configuration provider to get settings.
   * @param {SetResetPasswordEmailUseCase} setResetPasswordEmailUseCase - The use case to send the password reset email.
   */
  constructor(
    private readonly userService: UsersService,
    private readonly tokenEngine: TokensService,
    private readonly configProvider: ConfigProvider,
    private readonly setResetPasswordEmailUseCase: SetResetPasswordEmailUseCase,
  ) {}

  /**
   * Executes the password reset request creation.
   * @param {ForgetPassword} params - The parameters for the password reset request, containing the username.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async execute(params: ForgetPassword): Promise<void> {
    const user = await this.userService.findByUserName(params.userName);
    if (user) {
      const token = await this.tokenEngine.createTokenForPasswordReset(
        user.id,
        +(this.configProvider.getNumber('PASSWORD_RESET_LINK_DURATION') ?? 0),
      );
      await this.setResetPasswordEmailUseCase.execute(token, user);
    }
  }
}
