import { EMailData } from 'src/domain/emails/entities/email-data';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMailsProvider } from './interfaces/emails-provider.interface';
import { EMailsTemplateEngine } from './interfaces/emails-template.engine.interface';
import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';
export declare class EMailsInfrastructureService implements EMailsSender {
    private readonly emailProvider;
    private readonly templateEngine;
    private readonly templateRepository;
    constructor(emailProvider: EMailsProvider, templateEngine: EMailsTemplateEngine, templateRepository: EMailsTemplateRepository);
    sendTemplatedEmail(emailData: EMailData): Promise<EMailResponse>;
}
