import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';

export class TestProvider implements EMailsProvider {
  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<EMailResponse> {
    console.log(`Email to ${to}: ${subject}`);
    return Promise.resolve({ success: true, messageId: 'test-123', content });
  }
}
