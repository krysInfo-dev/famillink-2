import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';

@Injectable()
export class VerifyTokenIsValidUseCase {
  constructor(private readonly tokenEngine: TokensService) {}

  async execute(token: string): Promise<boolean> {
    const usedToken = await this.tokenEngine.isJwtTokenUsed(token);
    return !usedToken;
  }
}
