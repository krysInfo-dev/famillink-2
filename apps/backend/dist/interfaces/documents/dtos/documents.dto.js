"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDto = void 0;
class DocumentDto {
    id;
    documentType;
    documentUrl;
    static fromEntity(entity) {
        const dto = new DocumentDto();
        dto.id = entity.id;
        dto.documentType = entity.documentType;
        dto.documentUrl = entity.documentUrl;
        return dto;
    }
    static fromEntities(entities) {
        if (!entities) {
            return undefined;
        }
        return entities.map((entity) => DocumentDto.fromEntity(entity));
    }
}
exports.DocumentDto = DocumentDto;
//# sourceMappingURL=documents.dto.js.map