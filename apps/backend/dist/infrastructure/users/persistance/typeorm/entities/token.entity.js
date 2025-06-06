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
exports.TokenEntity = void 0;
const enum_token_type_1 = require("../../../../../domain/users/entities/enum-token-type");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let TokenEntity = class TokenEntity {
    id;
    token;
    tokenType;
    expirationDatetime;
    used;
    user;
};
exports.TokenEntity = TokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], TokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_token_type_1.ETokenType,
        default: enum_token_type_1.ETokenType.Initialisation,
    }),
    __metadata("design:type", String)
], TokenEntity.prototype, "tokenType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], TokenEntity.prototype, "expirationDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], TokenEntity.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, typeorm_1.Index)('idx_token_user_id'),
    __metadata("design:type", Object)
], TokenEntity.prototype, "user", void 0);
exports.TokenEntity = TokenEntity = __decorate([
    (0, typeorm_1.Entity)('famillink_tokens'),
    (0, typeorm_1.Index)('idx_token_type', ['tokenType'])
], TokenEntity);
//# sourceMappingURL=token.entity.js.map