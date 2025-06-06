import { Inject, Injectable } from '@nestjs/common';
import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';
import { EMAILS_SERVICE_TOKEN } from 'src/domain/emails/services/emails-sender.injection-token';
import { User } from 'src/domain/users/entities/user';

@Injectable()
export class SetResetPasswordEmailUseCase {
  constructor(
    @Inject(EMAILS_SERVICE_TOKEN)
    private readonly emailsSender: EMailsSender,
    private readonly configProvider: ConfigProvider,
  ) {}

  async execute(token: string, user: User): Promise<void> {
    await this.emailsSender.sendTemplatedEmail({
      to: user.userName,
      templateName: 'reseting_password',
      templateData: {
        first_name: user?.member?.firstName
          ? user?.member?.firstName
          : user.userName,
        last_name: user?.member?.lastName ? user?.member?.lastName : '',
        reset_token: `${this.configProvider.getString(
          'APP_FRONTEND_URL',
        )}/auth/password-reset/${token}/${user.id}`,
        support_email: this.configProvider.getString('APP_SUPPORT_EMAIL'),
        version: this.configProvider.getString('APP_VERSION'),
        copyright: this.configProvider.getString('APP_COPYRIGHT'),
      },
    });
  }
}
