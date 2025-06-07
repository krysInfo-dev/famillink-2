import { Injectable, Inject } from '@nestjs/common';
import { EMailData } from 'src/domain/emails/entities/email-data';
import { EMailResponse } from 'src/domain/emails/entities/email-response';
import { EMAILS_INJECTION_TOKENS } from './emails.injection-token';
import { EMailsProvider } from './interfaces/emails-provider.interface';
import { EMailsTemplateEngine } from './interfaces/emails-template.engine.interface';
import { EMailsTemplateRepository } from 'src/domain/emails/repositories/emails-template.repository';
import { EMailsSender } from 'src/domain/emails/services/emails-sender';

/**
 * Infrastructure service for sending emails.
 * This class implements the `EMailsSender` interface and orchestrates the process of sending templated emails.
 */
@Injectable()
export class EMailsInfrastructureService implements EMailsSender {
  /**
   * @param {EMailsProvider} emailProvider - The provider for sending emails (e.g., Brevo, SendGrid).
   * @param {EMailsTemplateEngine} templateEngine - The engine for rendering email templates (e.g., Liquid).
   * @param {EMailsTemplateRepository} templateRepository - The repository for retrieving email templates.
   */
  constructor(
    @Inject(EMAILS_INJECTION_TOKENS.EMAIL_PROVIDER)
    private readonly emailProvider: EMailsProvider,
    @Inject(EMAILS_INJECTION_TOKENS.TEMPLATE_ENGINE)
    private readonly templateEngine: EMailsTemplateEngine,
    @Inject(EMAILS_INJECTION_TOKENS.TEMPLATE_REPOSITORY)
    private readonly templateRepository: EMailsTemplateRepository,
  ) {}

  /**
   * Sends a templated email.
   * It retrieves the template, renders the subject and content, and then sends the email via the provider.
   * @param {EMailData} emailData - The data for the email.
   * @returns {Promise<EMailResponse>} The response from the email provider.
   */
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
