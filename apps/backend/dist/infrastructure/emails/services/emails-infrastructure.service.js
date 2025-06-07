"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMailsInfrastructureService = void 0;
const common_1 = require("@nestjs/common");
const emails_injection_token_1 = require("./emails.injection-token");
let EMailsInfrastructureService = class EMailsInfrastructureService {
    emailProvider;
    templateEngine;
    templateRepository;
    constructor(emailProvider, templateEngine, templateRepository) {
        this.emailProvider = emailProvider;
        this.templateEngine = templateEngine;
        this.templateRepository = templateRepository;
    }
    async sendTemplatedEmail(emailData) {
        try {
            const template = await this.templateRepository.findByName(emailData.templateName);
            const [renderedSubject, renderedContent] = await Promise.all([
                this.templateEngine.renderSubject(template.subject, emailData.templateData),
                this.templateEngine.render(template.content, emailData.templateData),
            ]);
            return await this.emailProvider.sendEmail(emailData.to, renderedSubject, renderedContent);
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
};
exports.EMailsInfrastructureService = EMailsInfrastructureService;
exports.EMailsInfrastructureService = EMailsInfrastructureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(emails_injection_token_1.EMAILS_INJECTION_TOKENS.EMAIL_PROVIDER)),
    __param(1, (0, common_1.Inject)(emails_injection_token_1.EMAILS_INJECTION_TOKENS.TEMPLATE_ENGINE)),
    __param(2, (0, common_1.Inject)(emails_injection_token_1.EMAILS_INJECTION_TOKENS.TEMPLATE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EMailsInfrastructureService);
//# sourceMappingURL=emails-infrastructure.service.js.map