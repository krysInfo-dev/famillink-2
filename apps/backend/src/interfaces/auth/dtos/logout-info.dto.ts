import { ApiProperty } from '@nestjs/swagger';

/**
 * @class LogoutInfoDto
 * @description DTO for user logout.
 */
export class LogoutInfoDto {
  /**
   * The JWT token.
   * @type {string}
   */
  @ApiProperty({
    description: 'The JWT token',
    type: String,
  })
  token: string;

  /**
   * The unique identifier of the user.
   * @type {number}
   * @example 1
   */
  @ApiProperty({
    description: 'The unique identifier of the user',
    type: Number,
    example: 1,
  })
  userId: number;
}
