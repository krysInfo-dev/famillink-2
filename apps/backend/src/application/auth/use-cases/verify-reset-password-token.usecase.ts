import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { VerifyResetPasswordToken } from 'src/domain/auth/entities/verify-reset-password';
import { User } from 'src/domain/users/entities/user';

/**
 * Use case for verifying a password reset token.
 * This class is responsible for checking if a given password reset token is valid and belongs to the specified user.
 */
@Injectable()
export class VerifyResetPasswordTokenUseCase {
  /**
   * @param {TokensService} tokenEngine - The token service to validate the password reset token.
   */
  constructor(private readonly tokenEngine: TokensService) {}

  /**
   * Executes the token verification process.
   * @param {VerifyResetPasswordToken} param - The parameters for token verification, including the token and user ID.
   * @returns {Promise<User | null | undefined>} The user associated with the token if it's valid, otherwise null or undefined.
   */
  async execute(
    param: VerifyResetPasswordToken,
  ): Promise<User | null | undefined> {
    return await this.tokenEngine.getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid(
      param.token,
      param.userId,
    );
  }
}
