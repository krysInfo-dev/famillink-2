import { ERole } from 'src/domain/users/entities/enum-role';
import { User } from 'src/domain/users/entities/user';
import { MemberDto } from 'src/interfaces/members/dtos/member.dto';

export class UserDto {
  id?: number;
  userName: string;
  password: string;
  role: ERole;
  inactivated: boolean;
  causeOfInactivation?: string;
  inactivationDate?: Date;
  member?: MemberDto;

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
