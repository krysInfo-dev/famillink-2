import { Document } from 'src/domain/documents/entities/document';
export declare class DocumentDto {
    id?: number;
    documentType: string;
    documentUrl: string;
    static fromEntity(entity: Document): DocumentDto;
    static fromEntities(entities: Document[] | undefined): DocumentDto[] | undefined;
}
