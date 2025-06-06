import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @ApiProperty({
    description: 'Numéro de page (commence à 1)',
    default: 1,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: "Nombre d'éléments par page",
    default: 10,
    required: false,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Champ de tri',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'id';

  @ApiProperty({
    description: 'Direction de tri (ASC ou DESC)',
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
  })
  @IsString()
  @IsOptional()
  sortDirection?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({
    description: 'Terme de recherche pour filtrer les membres',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
