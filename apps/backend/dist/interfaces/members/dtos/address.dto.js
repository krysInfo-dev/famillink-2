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
exports.AddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddressDto {
    id;
    street;
    complement;
    zipCode;
    city;
    country;
}
exports.AddressDto = AddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "l'id unique de l'adresse",
        type: 'number',
    }),
    __metadata("design:type", Number)
], AddressDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "la rue de l'adresse",
        type: String,
    }),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Le complément de l'adresse, par exemple le numéro de bâtiment",
        type: String,
    }),
    __metadata("design:type", String)
], AddressDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Le code postal de l'adresse",
        type: String,
    }),
    __metadata("design:type", String)
], AddressDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "La commune de l'adresse, par exemple Paris, Lyon, Marseille, ...",
        type: String,
    }),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Le pays de l'adresse",
        type: String,
    }),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
//# sourceMappingURL=address.dto.js.map