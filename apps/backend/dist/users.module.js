"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./application/users/services/users.service");
const tokens_service_1 = require("./application/users/services/tokens.service");
const core_module_1 = require("./core.module");
const tokens_persistance_service_1 = require("./infrastructure/users/persistance/typeorm/repositories/tokens-persistance.service");
const users_persistance_service_1 = require("./infrastructure/users/persistance/typeorm/repositories/users-persistance.service");
const token_entity_1 = require("./infrastructure/users/persistance/typeorm/entities/token.entity");
const user_entity_1 = require("./infrastructure/users/persistance/typeorm/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_injection_token_1 = require("./domain/users/repositories/users.injection-token");
const tokens_injection_token_1 = require("./domain/users/repositories/tokens.injection-token");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, token_entity_1.TokenEntity])],
        providers: [
            {
                provide: users_injection_token_1.USERS_DOMAIN_REPOSITORY,
                useClass: users_persistance_service_1.UsersPersistanceService,
            },
            {
                provide: tokens_injection_token_1.TOKENS_DOMAIN_REPOSITORY,
                useClass: tokens_persistance_service_1.TokensPersistanceService,
            },
            users_service_1.UsersService,
            tokens_service_1.TokensService,
        ],
        controllers: [],
        exports: [users_service_1.UsersService, tokens_service_1.TokensService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map