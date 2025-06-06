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
exports.LoginInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginInfoDto {
    username;
    password;
}
exports.LoginInfoDto = LoginInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Le nom de l'utilisateur",
        type: String,
    }),
    __metadata("design:type", String)
], LoginInfoDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Le mot de passe de l'utilisateur",
        type: String,
    }),
    __metadata("design:type", String)
], LoginInfoDto.prototype, "password", void 0);
//# sourceMappingURL=login-info.dto.js.map