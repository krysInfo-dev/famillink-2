import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';

/**
 * Use case for verifying if a JWT token is valid.
 * This class checks if a token has been used (e.g., for logout).
 */
@Injectable()
export class VerifyTokenIsValidUseCase {
  /**
   * @param {TokensService} tokenEngine - The token service to check the token status.
   */
  constructor(private readonly tokenEngine: TokensService) {}

  /**
   * Executes the token validation check.
   * @param {string} token - The JWT token to validate.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the token is valid (not used), otherwise `false`.
   */
  async execute(token: string): Promise<boolean> {
    const usedToken = await this.tokenEngine.isJwtTokenUsed(token);
    return !usedToken;
  }
}
