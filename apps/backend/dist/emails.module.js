"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EMailsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMailsModule = void 0;
const common_1 = require("@nestjs/common");
const set_reset_password_email_usecase_1 = require("./application/emails/use-cases/set-reset-password-email.usecase");
const typeorm_1 = require("@nestjs/typeorm");
const emails_template_persistance_service_1 = require("./infrastructure/emails/persistance/typeorm/repositories/emails-template.persistance.service");
const emails_infrastructure_service_1 = require("./infrastructure/emails/services/emails-infrastructure.service");
const liquid_template_engine_1 = require("./infrastructure/emails/services/implementations/engines/liquid-template.engine");
const brevo_provider_1 = require("./infrastructure/emails/services/implementations/providers/brevo.provider");
const test_provider_1 = require("./infrastructure/emails/services/implementations/providers/test.provider");
const emails_template_entity_1 = require("./infrastructure/emails/persistance/typeorm/entities/emails-template.entity");
const core_module_1 = require("./core.module");
const emails_injection_token_1 = require("./infrastructure/emails/services/emails.injection-token");
const emails_template_service_token_1 = require("./infrastructure/emails/services/interfaces/emails-template.service.token");
const config_provider_1 = require("./domain/core/services/config-provider");
const emails_sender_injection_token_1 = require("./domain/emails/services/emails-sender.injection-token");
let EMailsModule = EMailsModule_1 = class EMailsModule {
    static forRoot() {
        return {
            module: EMailsModule_1,
            imports: [core_module_1.CoreModule, typeorm_1.TypeOrmModule.forFeature([emails_template_entity_1.EMailsTemplateEntity])],
            providers: [
                {
                    provide: emails_injection_token_1.EMAILS_INJECTION_TOKENS.EMAIL_PROVIDER,
                    inject: [config_provider_1.ConfigProvider],
                    useFactory: (configProvider) => {
                        const provider = configProvider.getString('EMAIL_PROVIDER');
                        return provider === 'brevo'
                            ? new brevo_provider_1.BrevoProvider(configProvider)
                            : new test_provider_1.TestProvider();
                    },
                },
                {
                    provide: emails_injection_token_1.EMAILS_INJECTION_TOKENS.TEMPLATE_ENGINE,
                    useClass: liquid_template_engine_1.LiquidTemplateEngine,
                },
                emails_template_persistance_service_1.EMailsTemplatePersistanceService,
                {
                    provide: emails_injection_token_1.EMAILS_INJECTION_TOKENS.TEMPLATE_REPOSITORY,
                    useExisting: emails_template_persistance_service_1.EMailsTemplatePersistanceService,
                },
                {
                    provide: emails_template_service_token_1.EMAILS_TEMPLATE_SERVICE_TOKEN,
                    useExisting: emails_template_persistance_service_1.EMailsTemplatePersistanceService,
                },
                emails_infrastructure_service_1.EMailsInfrastructureService,
                {
                    provide: emails_sender_injection_token_1.EMAILS_SERVICE_TOKEN,
                    useExisting: emails_infrastructure_service_1.EMailsInfrastructureService,
                },
                set_reset_password_email_usecase_1.SetResetPasswordEmailUseCase,
            ],
            exports: [emails_infrastructure_service_1.EMailsInfrastructureService, set_reset_password_email_usecase_1.SetResetPasswordEmailUseCase],
        };
    }
};
exports.EMailsModule = EMailsModule;
exports.EMailsModule = EMailsModule = EMailsModule_1 = __decorate([
    (0, common_1.Module)({})
], EMailsModule);
//# sourceMappingURL=emails.module.js.map