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
exports.SocialNetworkEntity = void 0;
const enum_social_network_type_1 = require("../../../../../domain/members/entities/enum-social-network-type");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
let SocialNetworkEntity = class SocialNetworkEntity {
    id;
    member;
    socialNetworkType;
    value;
};
exports.SocialNetworkEntity = SocialNetworkEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SocialNetworkEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.MemberEntity, (member) => member.socialsNetworks, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", member_entity_1.MemberEntity)
], SocialNetworkEntity.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_social_network_type_1.ESocialNetworkType,
        default: enum_social_network_type_1.ESocialNetworkType.Facebook,
    }),
    __metadata("design:type", String)
], SocialNetworkEntity.prototype, "socialNetworkType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], SocialNetworkEntity.prototype, "value", void 0);
exports.SocialNetworkEntity = SocialNetworkEntity = __decorate([
    (0, typeorm_1.Entity)('famillink_social_networks')
], SocialNetworkEntity);
//# sourceMappingURL=social-network.entity.js.map