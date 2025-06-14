import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * The users's password.
   * @type {string}
   * @example 'password123'
   */
  @ApiProperty({
    description: "The users's password",
    type: String,
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
