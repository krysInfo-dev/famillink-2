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
exports.MemberEntity = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const social_network_entity_1 = require("./social-network.entity");
const document_entity_1 = require("../../../../documents/persistance/typeorm/entities/document.entity");
let MemberEntity = class MemberEntity {
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
};
exports.MemberEntity = MemberEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MemberEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], MemberEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], MemberEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MemberEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MemberEntity.prototype, "deathDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.AddressEntity, {
        cascade: ['insert', 'update', 'remove'],
        nullable: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'address_id' }),
    __metadata("design:type", address_entity_1.AddressEntity)
], MemberEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => social_network_entity_1.SocialNetworkEntity, (socialNetwork) => socialNetwork.member, { cascade: ['insert', 'update', 'remove'], nullable: true }),
    __metadata("design:type", Array)
], MemberEntity.prototype, "socialsNetworks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MemberEntity.prototype, "biography", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => document_entity_1.DocumentEntity, {
        nullable: true,
        eager: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'photo_id' }),
    __metadata("design:type", document_entity_1.DocumentEntity)
], MemberEntity.prototype, "photo", void 0);
exports.MemberEntity = MemberEntity = __decorate([
    (0, typeorm_1.Entity)('famillink_members'),
    (0, typeorm_1.Index)('idx_member_code', ['code'])
], MemberEntity);
//# sourceMappingURL=member.entity.js.map