import { EMailsTemplateEngine } from '../../interfaces/emails-template.engine.interface';
export declare class LiquidTemplateEngine implements EMailsTemplateEngine {
    private readonly engine;
    constructor();
    render(template: string, data: Record<string, string>): Promise<string>;
    renderSubject(template: string, data: Record<string, string>): Promise<string>;
}
