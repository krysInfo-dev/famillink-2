import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { Repository } from 'typeorm';
import { EMailsTemplateEntity } from '../entities/emails-template.entity';
import { EMailsTemplate } from 'src/domain/emails/entities/emails-template';

/**
 * TypeORM implementation of the email templates repository.
 * This service handles database operations for email templates using TypeORM.
 */
@Injectable()
export class EMailsTemplatePersistanceService
  implements EMailsTemplateRepository
{
  /**
   * @param {Repository<EMailsTemplateEntity>} repository - The TypeORM repository for email templates.
   */
  constructor(
    @InjectRepository(EMailsTemplateEntity)
    private readonly repository: Repository<EMailsTemplateEntity>,
  ) {}

  /**
   * Finds an email template by its name.
   * @param {string} name - The name of the template.
   * @returns {Promise<EMailsTemplate>} The email template entity.
   * @throws {NotFoundException} If the template is not found.
   */
  async findByName(name: string): Promise<EMailsTemplate> {
    const template = await this.repository.findOne({ where: { name } });
    if (!template) {
      throw new NotFoundException(`Template ${name} not found`);
    }
    return template;
  }
}
