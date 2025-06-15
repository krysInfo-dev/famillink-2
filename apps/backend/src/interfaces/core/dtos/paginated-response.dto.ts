import { ApiProperty } from '@nestjs/swagger';

/**
 * @class PaginationMetaDto
 * @description DTO for pagination metadata.
 * This DTO contains information about the current pagination,
 * such as the total number of items, number of pages, etc.
 */
export class PaginationMetaDto {
  /**
   * The total number of items.
   * @type {number}
   */
  @ApiProperty({
    description: 'Total number of items',
    type: Number,
  })
  totalItems: number;

  /**
   * The total number of pages.
   * @type {number}
   */
  @ApiProperty({
    description: 'Total number of pages',
    type: Number,
  })
  totalPages: number;

  /**
   * The current page.
   * @type {number}
   */
  @ApiProperty({
    description: 'Current page',
    type: Number,
  })
  currentPage?: number;

  /**
   * The number of items per page.
   * @type {number}
   */
  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
  })
  itemsPerPage?: number;

  /**
   * Indicates if there is a previous page.
   * @type {boolean}
   */
  @ApiProperty({
    description: 'Indicates if there is a previous page',
    type: Boolean,
  })
  hasPreviousPage: boolean;

  /**
   * Indicates if there is a next page.
   * @type {boolean}
   */
  @ApiProperty({
    description: 'Indicates if there is a next page',
    type: Boolean,
  })
  hasNextPage: boolean;
}

/**
 * @class PaginatedResponseDto
 * @description Generic DTO for a paginated response.
 * This DTO is used to return a paginated list of items
 * with pagination metadata.
 * @template T
 */
export class PaginatedResponseDto<T> {
  /**
   * The list of items for the current page.
   * @type {T[]}
   */
  @ApiProperty({
    description: 'List of items for the current page',
    isArray: true,
  })
  items: T[];

  /**
   * The pagination metadata.
   * @type {PaginationMetaDto}
   */
  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  /**
   * Creates a new instance of PaginatedResponseDto.
   * @param {T[]} items The items for the current page.
   * @param {number} totalItems The total number of items.
   * @param {number} currentPage The current page.
   * @param {number} itemsPerPage The number of items per page.
   */
  constructor(
    items: T[],
    totalItems: number,
    currentPage: number | undefined,
    itemsPerPage: number | undefined,
  ) {
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
