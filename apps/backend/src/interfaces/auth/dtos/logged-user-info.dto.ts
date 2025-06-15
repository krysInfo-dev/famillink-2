import { ApiProperty } from '@nestjs/swagger';
import { ERole } from 'src/domain/users/entities/enum-role';

/**
 * @class LoggedUserInfoDto
 * @description Information about the logged-in users.
 */
export class LoggedUserInfoDto {
  /**
   * The unique identifier of the users.
   * @type {number}
   * @example 1
   */
  @ApiProperty({
    description: 'The unique identifier of the users',
    type: Number,
    example: 1,
  })
  id: number;

  /**
   * The username.
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
   * The full name of the users.
   * @type {string}
   * @example 'John Doe'
   */
  @ApiProperty({
    description: 'The full name of the users',
    type: String,
    example: 'John Doe',
  })
  fullName: string;

  /**
   * The role of the users.
   * @type {ERole}
   * @enum {ERole}
   */
  @ApiProperty({
    description: 'The role of the users',
    enum: ERole,
  })
  role: ERole;

  /**
   * The unique identifier of the member (if the users is one).
   * @type {number}
   * @example 123
   */
  @ApiProperty({
    description: 'The unique identifier of the member',
    type: Number,
    required: false,
    example: 123,
  })
  memberId?: number;

  /**
   * The JWT authentication token.
   * @type {string}
   */
  @ApiProperty({
    description: 'JWT Token',
    type: String,
  })
  token: string;
}
