import { ApiProperty } from '@nestjs/swagger';

/**
 * @class ImportErrorDto
 * @description DTO for an import error.
 */
export class ImportErrorDto {
  /**
   * The line number in the CSV file.
   * @type {number}
   */
  @ApiProperty({ description: 'Line number in the CSV file' })
  line: number;

  /**
   * The error message.
   * @type {string}
   */
  @ApiProperty({ description: 'Error message' })
  message: string;
}

/**
 * @class ImportResultDto
 * @description DTO for the result of an import.
 */
export class ImportResultDto {
  /**
   * The number of created members.
   * @type {number}
   */
  @ApiProperty({ description: 'Number of created members' })
  membersCreated: number;

  /**
   * The number of updated members.
   * @type {number}
   */
  @ApiProperty({ description: 'Number of updated members' })
  membersUpdated: number;

  /**
   * The number of created users.
   * @type {number}
   */
  @ApiProperty({ description: 'Number of created users' })
  usersCreated: number;

  /**
   * The number of updated users.
   * @type {number}
   */
  @ApiProperty({ description: 'Number of updated users' })
  usersUpdated: number;

  /**
   * The list of errors encountered during the import.
   * @type {ImportErrorDto[]}
   */
  @ApiProperty({
    description: 'List of errors encountered during the import',
    type: [ImportErrorDto],
  })
  errors: ImportErrorDto[];
}
