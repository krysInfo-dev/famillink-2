export interface EMailsTemplateEngine {
  render(template: string, data: Record<string, string>): Promise<string>;

  renderSubject(
    template: string,
    data: Record<string, string>,
  ): Promise<string>;
}
