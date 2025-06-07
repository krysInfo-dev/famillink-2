import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { LogoutInformations } from 'src/domain/auth/entities/logout-information';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly tokenEngine: TokensService) {}

  async execute(logoutInfos: LogoutInformations): Promise<void> {
    await this.tokenEngine.addUsedJwtToken(
      logoutInfos.token,
      logoutInfos.userId,
    );
  }
}
