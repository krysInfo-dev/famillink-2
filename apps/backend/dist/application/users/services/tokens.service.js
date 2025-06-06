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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const enum_token_type_1 = require("../../../domain/users/entities/enum-token-type");
const token_1 = require("../../../domain/users/entities/token");
const tokens_injection_token_1 = require("../../../domain/users/repositories/tokens.injection-token");
const users_injection_token_1 = require("../../../domain/users/repositories/users.injection-token");
const uuid_1 = require("uuid");
let TokensService = class TokensService {
    userRepository;
    tokenRepository;
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    async createTokenForNewUser(userId, duration) {
        return this.createToken(userId, duration, enum_token_type_1.ETokenType.Initialisation);
    }
    async createTokenForPasswordReset(userId, duration) {
        return this.createToken(userId, duration, enum_token_type_1.ETokenType.Reset);
    }
    async isTokenValide(token) {
        const tokenEntity = await this.tokenRepository.readByToken(token);
        return (!!tokenEntity &&
            !!tokenEntity.expirationDatetime &&
            Date.now() < tokenEntity.expirationDatetime.getTime());
    }
    async getUserForToken(token) {
        const tokenEntity = await this.tokenRepository.readByTokenWithUser(token);
        console.dir(tokenEntity);
        return tokenEntity?.user;
    }
    async getUserForTokenWhereUserIdIsUserIdIdAndTokenIsValid(token, userId) {
        return await this.tokenRepository
            .readByTokenWithUserWhereUserIdIsUserIdIdAndTokenIsValid(token, userId)
            .then((res) => res?.user);
    }
    async setTokenUsed(token) {
        const tokenEntity = await this.tokenRepository.readByToken(token);
        if (tokenEntity) {
            if (tokenEntity.tokenType === enum_token_type_1.ETokenType.Initialisation ||
                tokenEntity.tokenType === enum_token_type_1.ETokenType.Reset) {
                tokenEntity.expirationDatetime = new Date();
            }
            tokenEntity.used = true;
            await this.tokenRepository.update(tokenEntity);
        }
    }
    async addUsedJwtToken(token, userId) {
        const tokenEntity = new token_1.Token();
        tokenEntity.user = await this.userRepository.read(userId);
        tokenEntity.token = token;
        tokenEntity.tokenType = enum_token_type_1.ETokenType.JWT;
        tokenEntity.used = true;
        tokenEntity.expirationDatetime = new Date();
        await this.tokenRepository.create(tokenEntity);
    }
    async isJwtTokenUsed(token) {
        const tokenEntity = await this.tokenRepository.readByTokenAndType(token, enum_token_type_1.ETokenType.JWT);
        return tokenEntity ? tokenEntity.used : false;
    }
    async createToken(userId, duration, type) {
        const tokenEntity = new token_1.Token();
        tokenEntity.user = await this.userRepository.read(userId);
        tokenEntity.token = (0, uuid_1.v4)();
        tokenEntity.tokenType = type;
        tokenEntity.used = false;
        tokenEntity.expirationDatetime = this.createExpirationDate(duration);
        await this.tokenRepository.create(tokenEntity);
        return tokenEntity.token;
    }
    createExpirationDate(duration) {
        const date = new Date();
        date.setTime(date.getTime() + duration);
        return date;
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_injection_token_1.USERS_DOMAIN_REPOSITORY)),
    __param(1, (0, common_1.Inject)(tokens_injection_token_1.TOKENS_DOMAIN_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], TokensService);
//# sourceMappingURL=tokens.service.js.map