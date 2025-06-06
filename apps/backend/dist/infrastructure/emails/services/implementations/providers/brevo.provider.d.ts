import { ConfigProvider } from 'src/domain/core/services/config-provider';
import { EMailsProvider } from '../../interfaces/emails-provider.interface';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
export declare class BrevoProvider implements EMailsProvider {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigProvider);
    sendEmail(to: string, subject: string, content: string): Promise<EMailResponse>;
}
