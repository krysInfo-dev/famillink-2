import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';
import { EMAILS_SERVICE_TOKEN } from 'src/domain/emails/services/emails-sender.injection-token';
import { User } from 'src/domain/users/entities/user';

/**
 * Use case for sending a password reset email.
 * This class is responsible for sending a templated email to the users with a link to reset their password.
 */
@Injectable()
export class SetResetPasswordEmailUseCase {
  private readonly logger = new Logger(SetResetPasswordEmailUseCase.name);

  /**
   * @param {EMailsSender} emailsSender - The email sending service.
   * @param {ConfigProvider} configProvider - The configuration provider to get application settings.
   */
  constructor(
    @Inject(EMAILS_SERVICE_TOKEN)
    private readonly emailsSender: EMailsSender,
    private readonly configProvider: ConfigProvider,
  ) {}

  /**
   * Executes the email sending process.
   * @param {string} token - The password reset token.
   * @param {User} user - The users to whom the email will be sent.
   * @returns {Promise<void>} A promise that resolves when the email has been sent.
   */
  async execute(token: string, user: User): Promise<void> {
    this.logger.log(
      `Entering SetResetPasswordEmailUseCase for ${user.userName}`,
    );
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
        )}/auth/reset-password/${token}/${user.id}`,
        support_email: this.configProvider.getString('APP_SUPPORT_EMAIL'),
        version: this.configProvider.getString('APP_VERSION'),
        copyright: this.configProvider.getString('APP_COPYRIGHT'),
      },
    });
    this.logger.log(
      `Exit SetResetPasswordEmailUseCase for ${user.userName}`,
    );
  }
}
