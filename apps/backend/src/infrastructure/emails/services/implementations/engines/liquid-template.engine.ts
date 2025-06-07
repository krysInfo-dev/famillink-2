import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EMailsTemplateEngine } from '../../interfaces/emails-template.engine.interface';
import { Liquid } from 'liquidjs';

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

  async renderSubject(
    template: string,
    data: Record<string, string>,
  ): Promise<string> {
    return this.render(template, data);
  }
}
