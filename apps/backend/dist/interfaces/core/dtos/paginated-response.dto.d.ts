export declare class PaginationMetaDto {
    totalItems: number;
    totalPages: number;
    currentPage?: number;
    itemsPerPage?: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export declare class PaginatedResponseDto<T> {
    items: T[];
    meta: PaginationMetaDto;
    constructor(items: T[], totalItems: number, currentPage: number | undefined, itemsPerPage: number | undefined);
}
