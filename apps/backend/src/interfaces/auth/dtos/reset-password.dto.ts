import { ApiProperty } from '@nestjs/swagger';

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
  newPassword: string;
}
