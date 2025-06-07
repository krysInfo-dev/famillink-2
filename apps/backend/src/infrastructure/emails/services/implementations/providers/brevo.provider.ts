import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import brevo = require('@getbrevo/brevo');
import { TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

export class BrevoProvider implements EMailsProvider {
  private readonly logger = new Logger(BrevoProvider.name);

  constructor(private readonly configService: ConfigProvider) {}

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<EMailResponse> {
    const transactionalApi = new brevo.TransactionalEmailsApi();
    transactionalApi.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      this.configService.getString('BREVO_API_KEY') || '',
    );

    const emailData: brevo.SendSmtpEmail = {
      to: [{ email: to }],
      subject,
      sender: { name: "Krys'Info", email: 'dev-nau@krysinfo.fr' },
      htmlContent: content,
    };

    try {
      const result = await transactionalApi.sendTransacEmail(emailData);
      this.logger.log(`Email envoyé à ${to}`);
      return { success: true, messageId: result.body.messageId };
    } catch (error) {
      this.logger.error(`Erreur envoi email à ${to}`, error);
      console.dir(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      return { success: false, error: error.message };
    }
  }
}
