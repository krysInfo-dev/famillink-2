import { ERole } from 'src/domain/users/entities/enum-role';
import { MemberEntity } from 'src/infrastructure/members/persistance/typeorm/entities/member.entity';
export declare class UserEntity {
    id: number;
    userName: string;
    password: string;
    role: ERole;
    inactivated: boolean;
    causeOfInactivation?: string;
    inactivatedDate?: Date;
    member?: MemberEntity;
}
