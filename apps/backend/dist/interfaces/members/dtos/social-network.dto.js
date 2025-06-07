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
exports.SocialNetworkDto = void 0;
const enum_social_network_type_1 = require("../../../domain/members/entities/enum-social-network-type");
const member_dto_1 = require("./member.dto");
const swagger_1 = require("@nestjs/swagger");
class SocialNetworkDto {
    id;
    member;
    socialNetworkType;
    value;
    static fromEntity(entity) {
        const dto = new SocialNetworkDto();
        dto.id = entity.id;
        dto.member = member_dto_1.MemberDto.fromEntity(entity.member);
        dto.socialNetworkType = entity.socialNetworkType;
        dto.value = entity.value;
        return dto;
    }
    static fromEntities(entities) {
        if (!entities) {
            return undefined;
        }
        return entities.map((entity) => SocialNetworkDto.fromEntity(entity));
    }
}
exports.SocialNetworkDto = SocialNetworkDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "l'id unique",
        type: 'number',
    }),
    __metadata("design:type", Number)
], SocialNetworkDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'le membre associé à ce réseau social',
        type: member_dto_1.MemberDto,
    }),
    __metadata("design:type", member_dto_1.MemberDto)
], SocialNetworkDto.prototype, "member", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'le type de ce réseau social',
        enum: enum_social_network_type_1.ESocialNetworkType,
        enumName: 'ESocialNetworkType',
    }),
    __metadata("design:type", String)
], SocialNetworkDto.prototype, "socialNetworkType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La valeur du réseau social',
        type: 'string',
    }),
    __metadata("design:type", String)
], SocialNetworkDto.prototype, "value", void 0);
//# sourceMappingURL=social-network.dto.js.map