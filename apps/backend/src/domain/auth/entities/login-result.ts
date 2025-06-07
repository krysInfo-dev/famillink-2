import { ERole } from 'src/domain/users/entities/enum-role';

export class LoginResult {
  id: number;
  username: string;
  fullName: string;
  role: ERole;
  memberId?: number;
  token: string;
}
