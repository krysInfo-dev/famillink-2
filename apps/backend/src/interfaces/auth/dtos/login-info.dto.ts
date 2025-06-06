import { ApiProperty } from '@nestjs/swagger';

/**
 * @class LoginInfoDto
 * @description User login information.
 */
export class LoginInfoDto {
  /**
   * The username for login.
   * @type {string}
   * @example 'johndoe'
   */
  @ApiProperty({
    description: 'The username',
    type: String,
    example: 'johndoe',
  })
  username: string;

  /**
   * The user's password.
   * @type {string}
   * @example 'password123'
   */
  @ApiProperty({
    description: "The user's password",
    type: String,
    example: 'password123',
  })
  password: string;
}
