import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { Repository } from 'typeorm';
import { EMailsTemplateEntity } from '../entities/emails-template.entity';
import { EMailsTemplate } from 'src/domain/emails/entities/emails-template';
export declare class EMailsTemplatePersistanceService implements EMailsTemplateRepository {
    private readonly repository;
    constructor(repository: Repository<EMailsTemplateEntity>);
    findByName(name: string): Promise<EMailsTemplate>;
}
