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
exports.LoggedUserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_role_1 = require("../../../domain/users/entities/enum-role");
class LoggedUserInfoDto {
    id;
    username;
    fullName;
    role;
    memberId;
    token;
}
exports.LoggedUserInfoDto = LoggedUserInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifiant unique de l'utilisateur",
        type: Number,
    }),
    __metadata("design:type", Number)
], LoggedUserInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom de l'utilisateur",
        type: String,
    }),
    __metadata("design:type", String)
], LoggedUserInfoDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom complet de l'utilisateur",
        type: String,
    }),
    __metadata("design:type", String)
], LoggedUserInfoDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Rôle de l'utilisateur",
        type: String,
    }),
    __metadata("design:type", String)
], LoggedUserInfoDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifiant unique du membre',
        type: Number,
    }),
    __metadata("design:type", Number)
], LoggedUserInfoDto.prototype, "memberId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token JWT',
        type: String,
    }),
    __metadata("design:type", String)
], LoggedUserInfoDto.prototype, "token", void 0);
//# sourceMappingURL=logged-user-info.dto.js.map