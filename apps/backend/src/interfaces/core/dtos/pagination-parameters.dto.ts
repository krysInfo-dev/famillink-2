import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * @class PaginationParamsDto
 * @description DTO for pagination parameters.
 */
export class PaginationParamsDto {
  /**
   * The page number (starts at 1).
   * @type {number}
   * @default 1
   */
  @ApiProperty({
    description: 'Page number (starts at 1)',
    default: 1,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  /**
   * The number of items per page.
   * @type {number}
   * @default 10
   */
  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  /**
   * The sort field.
   * @type {string}
   * @default 'id'
   */
  @ApiProperty({
    description: 'Sort field',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'id';

  /**
   * The sort direction (ASC or DESC).
   * @type {'ASC' | 'DESC'}
   * @default 'ASC'
   */
  @ApiProperty({
    description: 'Sort direction (ASC or DESC)',
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
  })
  @IsString()
  @IsOptional()
  sortDirection?: 'ASC' | 'DESC' = 'ASC';

  /**
   * The search term to filter members.
   * @type {string}
   */
  @ApiProperty({
    description: 'Search term to filter members',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
