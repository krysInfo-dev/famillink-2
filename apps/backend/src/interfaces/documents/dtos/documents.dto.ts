import { Document } from 'src/domain/documents/entities/document';
export class DocumentDto {
  id?: number;
  documentType: string;
  documentUrl: string;

  static fromEntity(entity: Document): DocumentDto {
    const dto = new DocumentDto();
    dto.id = entity.id;
    dto.documentType = entity.documentType;
    dto.documentUrl = entity.documentUrl;
    return dto;
  }

  static fromEntities(
    entities: Document[] | undefined,
  ): DocumentDto[] | undefined {
    if (!entities) {
      return undefined;
    }
    return entities.map((entity) => DocumentDto.fromEntity(entity));
  }
}
