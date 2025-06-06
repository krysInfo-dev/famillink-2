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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestForPasswordResetUseCase = void 0;
const common_1 = require("@nestjs/common");
const set_reset_password_email_usecase_1 = require("../../emails/use-cases/set-reset-password-email.usecase");
const tokens_service_1 = require("../../users/services/tokens.service");
const users_service_1 = require("../../users/services/users.service");
const config_provider_1 = require("../../../domain/core/services/config-provider");
let CreateRequestForPasswordResetUseCase = class CreateRequestForPasswordResetUseCase {
    userService;
    tokenEngine;
    configProvider;
    setResetPasswordEmailUseCase;
    constructor(userService, tokenEngine, configProvider, setResetPasswordEmailUseCase) {
        this.userService = userService;
        this.tokenEngine = tokenEngine;
        this.configProvider = configProvider;
        this.setResetPasswordEmailUseCase = setResetPasswordEmailUseCase;
    }
    async execute(params) {
        const user = await this.userService.findByUserName(params.userName);
        if (user) {
            const token = await this.tokenEngine.createTokenForPasswordReset(user.id, +(this.configProvider.getNumber('PASSWORD_RESET_LINK_DURATION') ?? 0));
            await this.setResetPasswordEmailUseCase.execute(token, user);
        }
    }
};
exports.CreateRequestForPasswordResetUseCase = CreateRequestForPasswordResetUseCase;
exports.CreateRequestForPasswordResetUseCase = CreateRequestForPasswordResetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        config_provider_1.ConfigProvider,
        set_reset_password_email_usecase_1.SetResetPasswordEmailUseCase])
], CreateRequestForPasswordResetUseCase);
//# sourceMappingURL=create-request-for-password-reset.usecase.js.map