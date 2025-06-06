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
exports.MembersRelationsEntity = void 0;
const enum_relation_type_1 = require("../../../../../domain/members/entities/enum-relation-type");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
let MembersRelationsEntity = class MembersRelationsEntity {
    id;
    member1;
    member2;
    relationType;
    rank;
};
exports.MembersRelationsEntity = MembersRelationsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MembersRelationsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.MemberEntity),
    (0, typeorm_1.JoinColumn)({ name: 'member_1_id' }),
    __metadata("design:type", member_entity_1.MemberEntity)
], MembersRelationsEntity.prototype, "member1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.MemberEntity),
    (0, typeorm_1.JoinColumn)({ name: 'member_2_id' }),
    __metadata("design:type", member_entity_1.MemberEntity)
], MembersRelationsEntity.prototype, "member2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_relation_type_1.ERelationType,
        default: enum_relation_type_1.ERelationType.Children,
    }),
    __metadata("design:type", String)
], MembersRelationsEntity.prototype, "relationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], MembersRelationsEntity.prototype, "rank", void 0);
exports.MembersRelationsEntity = MembersRelationsEntity = __decorate([
    (0, typeorm_1.Entity)('famillink_members_relations')
], MembersRelationsEntity);
//# sourceMappingURL=member-relation.entity.js.map