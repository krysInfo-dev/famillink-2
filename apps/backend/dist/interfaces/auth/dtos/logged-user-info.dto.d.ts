import { ERole } from 'src/domain/users/entities/enum-role';
export declare class LoggedUserInfoDto {
    id: number;
    username: string;
    fullName: string;
    role: ERole;
    memberId?: number;
    token: string;
}
