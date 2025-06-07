import { ApiProperty } from '@nestjs/swagger';

/**
 * @class AddressDto
 * @description DTO for an address.
 */
export class AddressDto {
  /**
   * The unique identifier of the address.
   * @type {number}
   */
  @ApiProperty({
    description: 'The unique identifier of the address',
    type: 'number',
  })
  id?: number;

  /**
   * The street of the address.
   * @type {string}
   */
  @ApiProperty({
    description: 'The street of the address',
    type: String,
  })
  street?: string;

  /**
   * The complement of the address, e.g., building number.
   * @type {string}
   */
  @ApiProperty({
    description: 'The complement of the address, e.g., building number',
    type: String,
  })
  complement?: string;

  /**
   * The zip code of the address.
   * @type {string}
   */
  @ApiProperty({
    description: 'The zip code of the address',
    type: String,
  })
  zipCode?: string;

  /**
   * The city of the address.
   * @type {string}
   */
  @ApiProperty({
    description: 'The city of the address, e.g., Paris, Lyon, Marseille, ...',
    type: String,
  })
  city?: string;

  /**
   * The country of the address.
   * @type {string}
   */
  @ApiProperty({
    description: 'The country of the address',
    type: String,
  })
  country?: string;
}
