import { ApiProperty } from '@nestjs/swagger';

/**
 * @class VerifyResetPasswordTokenDto
 * @description DTO to verify the password reset token.
 */
export class VerifyResetPasswordTokenDto {
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
}
