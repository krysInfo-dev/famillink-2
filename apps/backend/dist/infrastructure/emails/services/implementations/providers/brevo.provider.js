"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrevoProvider = void 0;
const common_1 = require("@nestjs/common");
const brevo = require("@getbrevo/brevo");
const brevo_1 = require("@getbrevo/brevo");
class BrevoProvider {
    configService;
    logger = new common_1.Logger(BrevoProvider.name);
    constructor(configService) {
        this.configService = configService;
    }
    async sendEmail(to, subject, content) {
        const transactionalApi = new brevo.TransactionalEmailsApi();
        transactionalApi.setApiKey(brevo_1.TransactionalEmailsApiApiKeys.apiKey, this.configService.getString('BREVO_API_KEY') || '');
        const emailData = {
            to: [{ email: to }],
            subject,
            sender: { name: "Krys'Info", email: 'dev-nau@krysinfo.fr' },
            htmlContent: content,
        };
        try {
            const result = await transactionalApi.sendTransacEmail(emailData);
            this.logger.log(`Email envoyé à ${to}`);
            return { success: true, messageId: result.body.messageId };
        }
        catch (error) {
            this.logger.error(`Erreur envoi email à ${to}`, error);
            console.dir(error);
            return { success: false, error: error.message };
        }
    }
}
exports.BrevoProvider = BrevoProvider;
//# sourceMappingURL=brevo.provider.js.map