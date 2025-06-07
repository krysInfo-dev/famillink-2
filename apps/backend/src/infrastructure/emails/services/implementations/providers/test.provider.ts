import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';

/**
 * A mock email provider for testing purposes.
 * This provider logs the email to the console instead of sending it.
 */
export class TestProvider implements EMailsProvider {
  /**
   * "Sends" an email by logging it to the console.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The email subject.
   * @param {string} content - The HTML content of the email.
   * @returns {Promise<EMailResponse>} A mock response.
   */
  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<EMailResponse> {
    console.log(`Email to ${to}: ${subject}`);
    return Promise.resolve({ success: true, messageId: 'test-123', content });
  }
}
