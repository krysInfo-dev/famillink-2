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
exports.ImportResultDto = exports.ImportErrorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImportErrorDto {
    line;
    message;
}
exports.ImportErrorDto = ImportErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de ligne dans le fichier CSV' }),
    __metadata("design:type", Number)
], ImportErrorDto.prototype, "line", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message d'erreur" }),
    __metadata("design:type", String)
], ImportErrorDto.prototype, "message", void 0);
class ImportResultDto {
    membersCreated;
    membersUpdated;
    usersCreated;
    usersUpdated;
    errors;
}
exports.ImportResultDto = ImportResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de membres créés' }),
    __metadata("design:type", Number)
], ImportResultDto.prototype, "membersCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de membres mis à jour' }),
    __metadata("design:type", Number)
], ImportResultDto.prototype, "membersUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nombre d'utilisateurs créés" }),
    __metadata("design:type", Number)
], ImportResultDto.prototype, "usersCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nombre d'utilisateurs mis à jour" }),
    __metadata("design:type", Number)
], ImportResultDto.prototype, "usersUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Liste des erreurs rencontrées lors de l'importation",
        type: [ImportErrorDto],
    }),
    __metadata("design:type", Array)
], ImportResultDto.prototype, "errors", void 0);
//# sourceMappingURL=import-result.dto.js.map