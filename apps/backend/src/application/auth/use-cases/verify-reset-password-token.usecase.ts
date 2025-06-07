import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { VerifyResetPasswordToken } from 'src/domain/auth/entities/verify-reset-password';
import { User } from 'src/domain/users/entities/user';

@Injectable()
export class VerifyResetPasswordTokenUseCase {
  constructor(private readonly tokenEngine: TokensService) {}

  async execute(
    param: VerifyResetPasswordToken,
  ): Promise<User | null | undefined> {
    return await this.tokenEngine.getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid(
      param.token,
      param.userId,
    );
  }
}
