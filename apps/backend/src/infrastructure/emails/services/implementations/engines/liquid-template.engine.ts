import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EMailsTemplateEngine } from '../../interfaces/emails-template.engine.interface';
import { Liquid } from 'liquidjs';

/**
 * Implementation of the email template engine using LiquidJS.
 */
@Injectable()
export class LiquidTemplateEngine implements EMailsTemplateEngine {
  private readonly engine: Liquid;

  constructor() {
    this.engine = new Liquid({
      strictVariables: true,
      strictFilters: true,
      cache: true,
    });
  }

  /**
   * Renders a template with the given data.
   * @param {string} template - The template string.
   * @param {Record<string, string>} data - The data to render the template with.
   * @returns {Promise<string>} The rendered template.
   * @throws {InternalServerErrorException} If template rendering fails.
   */
  async render(
    template: string,
    data: Record<string, string>,
  ): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await this.engine.parseAndRender(template, data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new InternalServerErrorException(
        `Template rendering failed: ${errorMessage}`,
      );
    }
  }

  /**
   * Renders the subject of an email.
   * This method is an alias for the render method.
   * @param {string} template - The subject template string.
   * @param {Record<string, string>} data - The data to render the subject with.
   * @returns {Promise<string>} The rendered subject.
   */
  async renderSubject(
    template: string,
    data: Record<string, string>,
  ): Promise<string> {
    return this.render(template, data);
  }
}
