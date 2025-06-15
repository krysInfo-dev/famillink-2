/**
 * Injection tokens for the emails module.
 * These tokens are used to inject different components of the email infrastructure.
 */
export const EMAILS_INJECTION_TOKENS = {
  /**
   * Token for the email provider (e.g., Brevo, SendGrid).
   */
  EMAIL_PROVIDER: 'EMAIL_PROVIDER',
  /**
   * Token for the template engine (e.g., Liquid).
   */
  TEMPLATE_ENGINE: 'TEMPLATE_ENGINE',
  /**
   * Token for the template repository.
   */
  TEMPLATE_REPOSITORY: 'TEMPLATE_REPOSITORY',
} as const;

/**
 * Type representing the possible values of the email injection tokens.
 */
export type EMailsInjectionTokens =
  (typeof EMAILS_INJECTION_TOKENS)[keyof typeof EMAILS_INJECTION_TOKENS];
