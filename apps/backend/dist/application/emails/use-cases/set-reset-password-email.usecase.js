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
exports.SetResetPasswordEmailUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_provider_1 = require("../../../domain/core/services/config-provider");
const emails_sender_injection_token_1 = require("../../../domain/emails/services/emails-sender.injection-token");
let SetResetPasswordEmailUseCase = class SetResetPasswordEmailUseCase {
    emailsSender;
    configProvider;
    constructor(emailsSender, configProvider) {
        this.emailsSender = emailsSender;
        this.configProvider = configProvider;
    }
    async execute(token, user) {
        await this.emailsSender.sendTemplatedEmail({
            to: user.userName,
            templateName: 'reseting_password',
            templateData: {
                first_name: user?.member?.firstName
                    ? user?.member?.firstName
                    : user.userName,
                last_name: user?.member?.lastName ? user?.member?.lastName : '',
                reset_token: `${this.configProvider.getString('APP_FRONTEND_URL')}/auth/password-reset/${token}/${user.id}`,
                support_email: this.configProvider.getString('APP_SUPPORT_EMAIL'),
                version: this.configProvider.getString('APP_VERSION'),
                copyright: this.configProvider.getString('APP_COPYRIGHT'),
            },
        });
    }
};
exports.SetResetPasswordEmailUseCase = SetResetPasswordEmailUseCase;
exports.SetResetPasswordEmailUseCase = SetResetPasswordEmailUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(emails_sender_injection_token_1.EMAILS_SERVICE_TOKEN)),
    __metadata("design:paramtypes", [Object, config_provider_1.ConfigProvider])
], SetResetPasswordEmailUseCase);
//# sourceMappingURL=set-reset-password-email.usecase.js.map