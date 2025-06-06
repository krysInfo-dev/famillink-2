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
exports.ResetPasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("../../users/services/tokens.service");
const users_service_1 = require("../../users/services/users.service");
let ResetPasswordUseCase = class ResetPasswordUseCase {
    tokenEngine;
    userService;
    constructor(tokenEngine, userService) {
        this.tokenEngine = tokenEngine;
        this.userService = userService;
    }
    async execute(param) {
        await this.tokenEngine.setTokenUsed(param.token);
        const user = await this.userService.read(param.userId);
        if (user) {
            user.password = param.newPassword;
        }
        return await this.userService.update(user);
    }
};
exports.ResetPasswordUseCase = ResetPasswordUseCase;
exports.ResetPasswordUseCase = ResetPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokens_service_1.TokensService,
        users_service_1.UsersService])
], ResetPasswordUseCase);
//# sourceMappingURL=reset-password.usecase.js.map