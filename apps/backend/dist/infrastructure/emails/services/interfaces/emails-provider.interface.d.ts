import { EMailResponse } from 'src/domain/emails/entities/email-response';
export interface EMailsProvider {
    sendEmail(to: string, subject: string, content: string): Promise<EMailResponse>;
}
