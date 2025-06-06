import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { Repository } from 'typeorm';
import { EMailsTemplateEntity } from '../entities/emails-template.entity';
import { EMailsTemplate } from 'src/domain/emails/entities/emails-template';

@Injectable()
export class EMailsTemplatePersistanceService
  implements EMailsTemplateRepository
{
  constructor(
    @InjectRepository(EMailsTemplateEntity)
    private readonly repository: Repository<EMailsTemplateEntity>,
  ) {}

  async findByName(name: string): Promise<EMailsTemplate> {
    const template = await this.repository.findOne({ where: { name } });
    if (!template) {
      throw new NotFoundException(`Template ${name} not found`);
    }
    return template;
  }
}
