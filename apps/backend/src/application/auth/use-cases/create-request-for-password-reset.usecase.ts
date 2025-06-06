import { Injectable } from '@nestjs/common';
import { SetResetPasswordEmailUseCase } from 'src/application/emails/use-cases/set-reset-password-email.usecase';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ForgetPassword } from 'src/domain/auth/entities/forget-password';
import { ConfigProvider } from 'src/domain/core/services/config-provider';

@Injectable()
export class CreateRequestForPasswordResetUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenEngine: TokensService,
    private readonly configProvider: ConfigProvider,
    private readonly setResetPasswordEmailUseCase: SetResetPasswordEmailUseCase,
  ) {}

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
