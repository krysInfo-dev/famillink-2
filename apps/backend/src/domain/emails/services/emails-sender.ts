import { EMailData } from '../entities/email-data';
import { EMailResponse } from '../entities/email-response';

/**
 * Interface for an email sending service.
 * Defines the contract for sending templated emails.
 */
export interface EMailsSender {
  /**
   * Sends a templated email.
   * @param {EMailData} data - The data for the email, including recipient, template name, and template data.
   * @returns {Promise<EMailResponse>} A promise that resolves with the response from the email service.
   */
  sendTemplatedEmail(data: EMailData): Promise<EMailResponse>;
}
