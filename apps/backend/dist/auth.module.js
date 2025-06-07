"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const create_request_for_password_reset_usecase_1 = require("./application/auth/use-cases/create-request-for-password-reset.usecase");
const login_usecase_1 = require("./application/auth/use-cases/login.usecase");
const logout_usecase_1 = require("./application/auth/use-cases/logout.usecase");
const reset_password_usecase_1 = require("./application/auth/use-cases/reset-password.usecase");
const verify_reset_password_token_usecase_1 = require("./application/auth/use-cases/verify-reset-password-token.usecase");
const verify_token_is_valid_usecase_1 = require("./application/auth/use-cases/verify-token-is-valid.usecase");
const auth_guards_1 = require("./interfaces/auth/guards/auth.guards");
const roles_guard_1 = require("./interfaces/auth/guards/roles.guard");
const auth_controller_1 = require("./interfaces/auth/controllers/auth.controller");
const emails_module_1 = require("./emails.module");
const core_module_1 = require("./core.module");
const users_module_1 = require("./users.module");
const config_provider_1 = require("./domain/core/services/config-provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            users_module_1.UsersModule,
            emails_module_1.EMailsModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                imports: [core_module_1.CoreModule],
                inject: [config_provider_1.ConfigProvider],
                useFactory: (configService) => ({
                    secret: configService.getString('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.getString('JWT_EXPIRES_IN') || '1h',
                    },
                }),
            }),
        ],
        providers: [
            create_request_for_password_reset_usecase_1.CreateRequestForPasswordResetUseCase,
            login_usecase_1.LoginUseCase,
            logout_usecase_1.LogoutUseCase,
            reset_password_usecase_1.ResetPasswordUseCase,
            verify_reset_password_token_usecase_1.VerifyResetPasswordTokenUseCase,
            verify_token_is_valid_usecase_1.VerifyTokenIsValidUseCase,
            auth_guards_1.AuthGuard,
            roles_guard_1.RolesGuard,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map