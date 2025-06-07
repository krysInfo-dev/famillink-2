import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * @class ResetPasswordDto
 * @description DTO for resetting user password.
 */
export class ResetPasswordDto {
  /**
   * The password reset token.
   * @type {string}
   */
  @ApiProperty({
    description: 'The password reset token',
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

  /**
   * The new password.
   * @type {string}
   * @example 'newPassword123'
   */
  @ApiProperty({
    description: 'The new password',
    type: String,
    example: 'newPassword123',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
