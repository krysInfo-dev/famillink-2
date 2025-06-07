import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'src/domain/documents/entities/document';

/**
 * @class DocumentDto
 * @description DTO for a document.
 */
export class DocumentDto {
  /**
   * The unique identifier of the document.
   * @type {number}
   */
  @ApiProperty({
    description: 'The unique identifier of the document',
    type: Number,
  })
  id?: number;

  /**
   * The type of the document.
   * @type {string}
   */
  @ApiProperty({
    description: 'The type of the document',
    type: String,
  })
  documentType: string;

  /**
   * The URL of the document.
   * @type {string}
   */
  @ApiProperty({
    description: 'The URL of the document',
    type: String,
  })
  documentUrl: string;

  /**
   * Creates a DocumentDto from a Document entity.
   * @param {Document} entity - The document entity.
   * @returns {DocumentDto} The created DTO.
   */
  static fromEntity(entity: Document): DocumentDto {
    const dto = new DocumentDto();
    dto.id = entity.id;
    dto.documentType = entity.documentType;
    dto.documentUrl = entity.documentUrl;
    return dto;
  }

  /**
   * Creates a list of DocumentDto from a list of Document entities.
   * @param {Document[]} entities - The list of document entities.
   * @returns {DocumentDto[] | undefined} The created list of DTOs.
   */
  static fromEntities(
    entities: Document[] | undefined,
  ): DocumentDto[] | undefined {
    if (!entities) {
      return undefined;
    }
    return entities.map((entity) => DocumentDto.fromEntity(entity));
  }
}
