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
exports.UserEntity = void 0;
const enum_role_1 = require("../../../../../domain/users/entities/enum-role");
const member_entity_1 = require("../../../../members/persistance/typeorm/entities/member.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
    id;
    userName;
    password;
    role;
    inactivated;
    causeOfInactivation;
    inactivatedDate;
    member;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enum_role_1.ERole, default: enum_role_1.ERole.User }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "inactivated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "causeOfInactivation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "inactivatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => member_entity_1.MemberEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    (0, typeorm_1.Index)('idx_user_member_id'),
    __metadata("design:type", member_entity_1.MemberEntity)
], UserEntity.prototype, "member", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('famillink_users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map