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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const login_info_dto_1 = require("../dtos/login-info.dto");
const logged_user_info_dto_1 = require("../dtos/logged-user-info.dto");
const logout_info_dto_1 = require("../dtos/logout-info.dto");
const useApiKey_decorator_1 = require("../../core/decorators/useApiKey.decorator");
const forget_password_dto_1 = require("../dtos/forget-password.dto");
const verify_reset_password_dto_1 = require("../dtos/verify-reset-password.dto");
const reset_password_dto_1 = require("../dtos/reset-password.dto");
const login_usecase_1 = require("../../../application/auth/use-cases/login.usecase");
const logout_usecase_1 = require("../../../application/auth/use-cases/logout.usecase");
const create_request_for_password_reset_usecase_1 = require("../../../application/auth/use-cases/create-request-for-password-reset.usecase");
const verify_reset_password_token_usecase_1 = require("../../../application/auth/use-cases/verify-reset-password-token.usecase");
const user_dto_1 = require("../../users/dtos/user.dto");
const reset_password_usecase_1 = require("../../../application/auth/use-cases/reset-password.usecase");
let AuthController = class AuthController {
    loginUseCase;
    logoutUseCase;
    createRequestForPasswordResetUseCase;
    verifyResetPasswordTokenUseCase;
    resetPasswordUseCase;
    constructor(loginUseCase, logoutUseCase, createRequestForPasswordResetUseCase, verifyResetPasswordTokenUseCase, resetPasswordUseCase) {
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.createRequestForPasswordResetUseCase = createRequestForPasswordResetUseCase;
        this.verifyResetPasswordTokenUseCase = verifyResetPasswordTokenUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
    }
    async login(loginInfo) {
        return await this.loginUseCase.execute({
            email: loginInfo.username,
            password: loginInfo.password,
        });
    }
    async logout(logoutInfo) {
        await this.logoutUseCase.execute(logoutInfo).then(() => undefined);
    }
    async forgetPassword(param) {
        return await this.createRequestForPasswordResetUseCase
            .execute(param)
            .then(() => undefined);
    }
    async verifyResetPasswordToken(param) {
        return await this.verifyResetPasswordTokenUseCase
            .execute(param)
            .then((user) => {
            if (user) {
                return user_dto_1.UserDto.fromEntity(user);
            }
            else {
                throw new Error('Invalid token');
            }
        });
    }
    async resetPassword(param) {
        return await this.resetPasswordUseCase.execute(param).then(() => undefined);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticates a user and returns user information with access token',
    }),
    (0, swagger_1.ApiBody)({ type: login_info_dto_1.LoginInfoDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User successfully authenticated',
        type: logged_user_info_dto_1.LoggedUserInfoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_info_dto_1.LoginInfoDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({
        summary: 'User logout',
        description: 'Logs out a user by invalidating their token',
    }),
    (0, swagger_1.ApiBody)({ type: logout_info_dto_1.LogoutInfoDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User successfully logged out',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_info_dto_1.LogoutInfoDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, useApiKey_decorator_1.UseApiKey)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('forget-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Request password reset',
        description: "Initiates the password reset process by sending a reset link to the user's email",
    }),
    (0, swagger_1.ApiBody)({ type: forget_password_dto_1.ForgetPasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Password reset email sent',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'User not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, useApiKey_decorator_1.UseApiKey)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('verify-reset-password-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify password reset token',
        description: 'Verifies if a password reset token is valid and returns user information',
    }),
    (0, swagger_1.ApiBody)({ type: verify_reset_password_dto_1.VerifyResetPasswordTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Token is valid',
        type: user_dto_1.UserDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid token',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_reset_password_dto_1.VerifyResetPasswordTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetPasswordToken", null);
__decorate([
    (0, useApiKey_decorator_1.UseApiKey)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset password',
        description: "Resets a user's password using a valid reset token",
    }),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Password successfully reset',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid token or password',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_usecase_1.LoginUseCase,
        logout_usecase_1.LogoutUseCase,
        create_request_for_password_reset_usecase_1.CreateRequestForPasswordResetUseCase,
        verify_reset_password_token_usecase_1.VerifyResetPasswordTokenUseCase,
        reset_password_usecase_1.ResetPasswordUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map