import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ResetPassword } from 'src/domain/auth/entities/reset-passord';

/**
 * Use case for resetting a user's password.
 * This class handles the logic for resetting a user's password after they have verified a password reset token.
 */
@Injectable()
export class ResetPasswordUseCase {
  /**
   * @param {TokensService} tokenEngine - The token service to manage and validate tokens.
   * @param {UsersService} userService - The user service to update user information.
   */
  constructor(
    private readonly tokenEngine: TokensService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Executes the password reset process.
   * It sets the provided token as used, retrieves the user, updates their password, and saves the changes.
   * @param {ResetPassword} param - The parameters for resetting the password, including the token and new password.
   * @returns {Promise<void>} A promise that resolves when the password has been successfully reset.
   */
  async execute(param: ResetPassword): Promise<void> {
    await this.tokenEngine.setTokenUsed(param.token);
    const user = await this.userService.read(param.userId);
    if (user) {
      user.password = param.newPassword;
      await this.userService.update(user);
    }
  }
}
