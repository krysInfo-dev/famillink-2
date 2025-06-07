import { ERole } from 'src/domain/users/entities/enum-role';
import { User } from 'src/domain/users/entities/user';
import { MemberDto } from 'src/interfaces/members/dtos/member.dto';
export declare class UserDto {
    id?: number;
    userName: string;
    password: string;
    role: ERole;
    inactivated: boolean;
    causeOfInactivation?: string;
    inactivationDate?: Date;
    member?: MemberDto;
    static fromEntity(user: User): UserDto;
}
