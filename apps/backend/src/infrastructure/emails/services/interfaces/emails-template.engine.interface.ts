/**
 * Interface for an email template engine.
 * Defines the contract for rendering email templates.
 */
export interface EMailsTemplateEngine {
  /**
   * Renders a template with the given data.
   * @param {string} template - The template string.
   * @param {Record<string, string>} data - The data to render the template with.
   * @returns {Promise<string>} The rendered template.
   */
  render(template: string, data: Record<string, string>): Promise<string>;

  /**
   * Renders the subject of an email.
   * @param {string} template - The subject template string.
   * @param {Record<string, string>} data - The data to render the subject with.
   * @returns {Promise<string>} The rendered subject.
   */
  renderSubject(
    template: string,
    data: Record<string, string>,
  ): Promise<string>;
}
