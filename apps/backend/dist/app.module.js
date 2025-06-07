"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_module_1 = require("./core.module");
const config_provider_1 = require("./domain/core/services/config-provider");
const document_entity_1 = require("./infrastructure/documents/persistance/typeorm/entities/document.entity");
const address_entity_1 = require("./infrastructure/members/persistance/typeorm/entities/address.entity");
const member_relation_entity_1 = require("./infrastructure/members/persistance/typeorm/entities/member-relation.entity");
const member_entity_1 = require("./infrastructure/members/persistance/typeorm/entities/member.entity");
const social_network_entity_1 = require("./infrastructure/members/persistance/typeorm/entities/social-network.entity");
const token_entity_1 = require("./infrastructure/users/persistance/typeorm/entities/token.entity");
const user_entity_1 = require("./infrastructure/users/persistance/typeorm/entities/user.entity");
const emails_template_entity_1 = require("./infrastructure/emails/persistance/typeorm/entities/emails-template.entity");
const auth_module_1 = require("./auth.module");
const emails_module_1 = require("./emails.module");
const users_module_1 = require("./users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [core_module_1.CoreModule],
                inject: [config_provider_1.ConfigProvider],
                useFactory: (configProvider) => ({
                    type: configProvider.getString('DB_TYPE'),
                    host: configProvider.getString('DB_HOST'),
                    port: configProvider.getNumber('DB_PORT'),
                    username: configProvider.getString('DB_USERNAME'),
                    password: configProvider.getString('DB_PASSWORD'),
                    database: configProvider.getString('DB_DATABASE_NAME'),
                    entities: [
                        document_entity_1.DocumentEntity,
                        emails_template_entity_1.EMailsTemplateEntity,
                        address_entity_1.AddressEntity,
                        member_entity_1.MemberEntity,
                        member_relation_entity_1.MembersRelationsEntity,
                        social_network_entity_1.SocialNetworkEntity,
                        token_entity_1.TokenEntity,
                        user_entity_1.UserEntity,
                    ],
                    synchronize: configProvider.getString('DB_SYNCHRONIZE') === 'true',
                }),
            }),
            emails_module_1.EMailsModule.forRoot(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map