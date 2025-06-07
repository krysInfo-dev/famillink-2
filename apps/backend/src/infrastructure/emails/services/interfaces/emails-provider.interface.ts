import { EMailResponse } from 'src/domain/emails/entities/email-response';

/**
 * Interface for an email provider.
 * Defines the contract for sending an email.
 */
export interface EMailsProvider {
  /**
   * Sends an email.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The email subject.
   * @param {string} content - The HTML content of the email.
   * @returns {Promise<EMailResponse>} The response from the email service.
   */
  sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<EMailResponse>;
}
