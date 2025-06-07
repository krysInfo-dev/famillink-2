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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const useApiKey_decorator_1 = require("../../core/decorators/useApiKey.decorator");
const verify_token_is_valid_usecase_1 = require("../../../application/auth/use-cases/verify-token-is-valid.usecase");
let AuthGuard = class AuthGuard {
    verifyTokenIsValidUseCase;
    jwtService;
    reflector;
    configService;
    constructor(verifyTokenIsValidUseCase, jwtService, reflector, configService) {
        this.verifyTokenIsValidUseCase = verifyTokenIsValidUseCase;
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.configService = configService;
    }
    async canActivate(context) {
        if (this.isPublic(context)) {
            return true;
        }
        if (this.isUseApiKey(context)) {
            return this.verifyApiKey(context);
        }
        return this.verifyJwtToken(context);
    }
    isPublic(context) {
        return this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
    isUseApiKey(context) {
        return this.reflector.getAllAndOverride(useApiKey_decorator_1.IS_API_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
    verifyApiKey(context) {
        const apiKey = this.configService.get('INTERNAL_API_KEY');
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return apiKey === token;
    }
    async verifyJwtToken(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        if (!(await this.verifyTokenIsValidUseCase.execute(token))) {
            console.log('token invalid');
            throw new common_1.UnauthorizedException();
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        }
        catch {
            console.log('token invalid 2');
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [verify_token_is_valid_usecase_1.VerifyTokenIsValidUseCase,
        jwt_1.JwtService,
        core_1.Reflector,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guards.js.map