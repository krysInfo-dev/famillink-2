import { EMailsTemplate } from 'src/domain/emails/entities/emails-template';
export interface EMailsTemplateRepository {
    findByName(name: string): Promise<EMailsTemplate>;
}
