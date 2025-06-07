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
exports.PaginatedResponseDto = exports.PaginationMetaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationMetaDto {
    totalItems;
    totalPages;
    currentPage;
    itemsPerPage;
    hasPreviousPage;
    hasNextPage;
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre total d'éléments",
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre total de pages',
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page actuelle',
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre d'éléments par page",
        type: Number,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Y a-t-il une page précédente',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], PaginationMetaDto.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Y a-t-il une page suivante',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], PaginationMetaDto.prototype, "hasNextPage", void 0);
class PaginatedResponseDto {
    items;
    meta;
    constructor(items, totalItems, currentPage, itemsPerPage) {
        this.items = items;
        const totalPages = Math.ceil(totalItems / (itemsPerPage ?? 1));
        this.meta = {
            totalItems,
            totalPages,
            currentPage,
            itemsPerPage,
            hasPreviousPage: (currentPage ?? 0) > 1,
            hasNextPage: (currentPage ?? 0) < totalPages,
        };
    }
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Liste des éléments pour la page actuelle',
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Métadonnées de pagination',
        type: PaginationMetaDto,
    }),
    __metadata("design:type", PaginationMetaDto)
], PaginatedResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=paginated-response.dto.js.map