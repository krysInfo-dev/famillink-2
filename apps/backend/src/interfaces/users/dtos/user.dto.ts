import { ApiProperty } from '@nestjs/swagger';
import { ERole } from 'src/domain/users/entities/enum-role';
import { User } from 'src/domain/users/entities/user';
import { MemberDto } from 'src/interfaces/members/dtos/member.dto';

/**
 * @class UserDto
 * @description DTO for a users.
 */
export class UserDto {
  /**
   * The unique identifier of the users.
   * @type {number}
   */
  @ApiProperty({ description: 'The unique identifier of the users' })
  id?: number;

  /**
   * The username.
   * @type {string}
   */
  @ApiProperty({ description: 'The username' })
  userName: string;

  /**
   * The users's password (hashed).
   * @type {string}
   */
  @ApiProperty({ description: "The users's password (hashed)" })
  password: string;

  /**
   * The role of the users.
   * @type {ERole}
   */
  @ApiProperty({ description: 'The role of the users', enum: ERole })
  role: ERole;

  /**
   * Indicates if the users is inactivated.
   * @type {boolean}
   */
  @ApiProperty({ description: 'Indicates if the users is inactivated' })
  inactivated: boolean;

  /**
   * The cause of inactivation.
   * @type {string}
   */
  @ApiProperty({ description: 'The cause of inactivation', required: false })
  causeOfInactivation?: string;

  /**
   * The date of inactivation.
   * @type {Date}
   */
  @ApiProperty({
    description: 'The date of inactivation',
    required: false,
    type: 'string',
    format: 'date-time',
  })
  inactivationDate?: Date;

  /**
   * The member associated with the users.
   * @type {MemberDto}
   */
  @ApiProperty({
    description: 'The member associated with the users',
    required: false,
    type: () => MemberDto,
  })
  member?: MemberDto;

  /**
   * Creates a UserDto from a User entity.
   * @param {User} user - The users entity.
   * @returns {UserDto} The created DTO.
   */
  static fromEntity(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.userName = user.userName;
    dto.password = user.password;
    dto.role = user.role;
    dto.inactivated = user.inactivated;
    dto.causeOfInactivation = user.causeOfInactivation;
    dto.inactivationDate = user.inactivatedDate;
    if (user.member) {
      dto.member = MemberDto.fromEntity(user.member);
    }
    return dto;
  }
}
