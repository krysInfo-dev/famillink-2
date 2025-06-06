import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import brevo = require('@getbrevo/brevo');
import { TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

/**
 * Email provider implementation using Brevo (formerly Sendinblue).
 */
export class BrevoProvider implements EMailsProvider {
  private readonly logger = new Logger(BrevoProvider.name);

  /**
   * @param {ConfigProvider} configService - The configuration service to get the API key.
   */
  constructor(private readonly configService: ConfigProvider) {}

  /**
   * Sends an email using the Brevo API.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The email subject.
   * @param {string} content - The HTML content of the email.
   * @returns {Promise<EMailResponse>} The response from the email service.
   */
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
      this.logger.log(`Email sent to ${to}`);
      return { success: true, messageId: result.body.messageId };
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
      console.dir(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      return { success: false, error: error.message };
    }
  }
}
