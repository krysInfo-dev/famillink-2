import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';
export declare class TestProvider implements EMailsProvider {
    sendEmail(to: string, subject: string, content: string): Promise<EMailResponse>;
}
