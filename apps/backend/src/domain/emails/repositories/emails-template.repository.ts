import { EMailsTemplate } from 'src/domain/emails/entities/emails-template';

/**
 * Interface for the email templates repository.
 * Defines the contract for accessing email template data.
 */
export interface EMailsTemplateRepository {
  /**
   * Finds an email template by its name.
   * @param {string} name - The name of the template.
   * @returns {Promise<EMailsTemplate>} The email template entity.
   */
  findByName(name: string): Promise<EMailsTemplate>;
}
