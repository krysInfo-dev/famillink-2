import { ApiProperty } from '@nestjs/swagger';

/**
 * @class ForgetPasswordDto
 * @description DTO for the password reset request.
 */
export class ForgetPasswordDto {
  /**
   * The username for which the reset is requested.
   * @type {string}
   * @example 'johndoe'
   */
  @ApiProperty({
    description: 'The username',
    type: String,
    example: 'johndoe',
  })
  userName: string;
}
