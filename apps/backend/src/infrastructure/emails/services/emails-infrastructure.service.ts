import { Injectable, Inject } from '@nestjs/common';
import { EMailData } from 'src/domain/emails/entities/email-data';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMAILS_INJECTION_TOKENS } from './emails.injection-token';
import { EMailsProvider } from './interfaces/emails-provider.interface';
import { EMailsTemplateEngine } from './interfaces/emails-template.engine.interface';
import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';

@Injectable()
export class EMailsInfrastructureService implements EMailsSender {
  constructor(
    @Inject(EMAILS_INJECTION_TOKENS.EMAIL_PROVIDER)
    private readonly emailProvider: EMailsProvider,
    @Inject(EMAILS_INJECTION_TOKENS.TEMPLATE_ENGINE)
    private readonly templateEngine: EMailsTemplateEngine,
    @Inject(EMAILS_INJECTION_TOKENS.TEMPLATE_REPOSITORY)
    private readonly templateRepository: EMailsTemplateRepository,
  ) {}

  async sendTemplatedEmail(emailData: EMailData): Promise<EMailResponse> {
    try {
      const template = await this.templateRepository.findByName(
        emailData.templateName,
      );
      const [renderedSubject, renderedContent] = await Promise.all([
        this.templateEngine.renderSubject(
          template.subject,
          emailData.templateData,
        ),
        this.templateEngine.render(template.content, emailData.templateData),
      ]);
      return await this.emailProvider.sendEmail(
        emailData.to,
        renderedSubject,
        renderedContent,
      );
    } catch (error) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        error: error.message,
      };
    }
  }
}
