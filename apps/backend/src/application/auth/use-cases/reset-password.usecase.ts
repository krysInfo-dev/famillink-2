import { Injectable } from '@nestjs/common';
import { TokensService } from 'src/application/users/services/tokens.service';
import { UsersService } from 'src/application/users/services/users.service';
import { ResetPassword } from 'src/domain/auth/entities/reset-passord';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly tokenEngine: TokensService,
    private readonly userService: UsersService,
  ) {}

  async execute(param: ResetPassword): Promise<void> {
    await this.tokenEngine.setTokenUsed(param.token);
    const user = await this.userService.read(param.userId);
    if (user) {
      user.password = param.newPassword;
    }
    return await this.userService.update(user);
  }
}
