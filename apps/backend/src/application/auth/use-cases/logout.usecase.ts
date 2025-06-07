import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { LogoutInformations } from 'src/domain/auth/entities/logout-information';

/**
 * Use case for handling user logout.
 * This class is responsible for invalidating a user's JWT token upon logout.
 */
@Injectable()
export class LogoutUseCase {
  /**
   * @param {TokensService} tokenEngine - The token service to manage JWT tokens.
   */
  constructor(private readonly tokenEngine: TokensService) {}

  /**
   * Executes the logout process.
   * This method adds the user's JWT token to a list of used tokens, effectively invalidating it.
   * @param {LogoutInformations} logoutInfos - The logout information, containing the token and user ID.
   * @returns {Promise<void>} A promise that resolves when the token has been invalidated.
   */
  async execute(logoutInfos: LogoutInformations): Promise<void> {
    await this.tokenEngine.addUsedJwtToken(
      logoutInfos.token,
      logoutInfos.userId,
    );
  }
}
