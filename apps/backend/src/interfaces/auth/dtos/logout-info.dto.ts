import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
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
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
