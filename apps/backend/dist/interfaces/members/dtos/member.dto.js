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
exports.MemberDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const documents_dto_1 = require("../../documents/dtos/documents.dto");
const social_network_dto_1 = require("./social-network.dto");
const address_dto_1 = require("./address.dto");
class MemberDto {
    id;
    code;
    firstName;
    lastName;
    nickName;
    birthDate;
    deathDate;
    address;
    phoneNumber;
    mobileNumber;
    email;
    website;
    socialsNetworks;
    biography;
    photo;
    static fromEntity(entity) {
        const dto = new MemberDto();
        dto.id = entity.id;
        dto.code = entity.code;
        dto.firstName = entity.firstName;
        dto.lastName = entity.lastName;
        dto.nickName = entity.nickName;
        dto.birthDate = entity.birthDate;
        dto.deathDate = entity.deathDate;
        dto.address = entity.address;
        dto.phoneNumber = entity.phoneNumber;
        dto.mobileNumber = entity.mobileNumber;
        dto.email = entity.email;
        dto.website = entity.website;
        dto.socialsNetworks = social_network_dto_1.SocialNetworkDto.fromEntities(entity.socialsNetworks);
        dto.biography = entity.biography;
        if (entity.photo) {
            dto.photo = documents_dto_1.DocumentDto.fromEntity(entity.photo);
        }
        return dto;
    }
    static fromEntities(entities) {
        if (!entities) {
            return undefined;
        }
        return entities.map((entity) => MemberDto.fromEntity(entity));
    }
}
exports.MemberDto = MemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "L'id unique du membre",
        type: 'number',
    }),
    __metadata("design:type", Number)
], MemberDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le code unique du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le prénom du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le nom de famille du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le surnom du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La date de naissance du membre',
        type: 'string',
    }),
    __metadata("design:type", Date)
], MemberDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La date de décès du membre',
        type: 'string',
    }),
    __metadata("design:type", Date)
], MemberDto.prototype, "deathDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "L'adresse du membre",
        type: address_dto_1.AddressDto,
    }),
    __metadata("design:type", address_dto_1.AddressDto)
], MemberDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le numéro de téléphone du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le numéro de mobile du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "mobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "L'email du membre",
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Le site web du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Les réseaux sociaux du membre',
        type: [social_network_dto_1.SocialNetworkDto],
    }),
    __metadata("design:type", Array)
], MemberDto.prototype, "socialsNetworks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La biographie du membre',
        type: 'string',
    }),
    __metadata("design:type", String)
], MemberDto.prototype, "biography", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La photo de profil du membre',
        type: documents_dto_1.DocumentDto,
    }),
    __metadata("design:type", documents_dto_1.DocumentDto)
], MemberDto.prototype, "photo", void 0);
//# sourceMappingURL=member.dto.js.map