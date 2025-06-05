import { Member } from '../members/member';
import { ERole } from './enum-role';

export class User {
  id!: number;
  userName!: string;
  password!: string;
  role!: ERole;
  inactivated!: boolean;
  causeOfInactivation?: string;
  inactivatedDate?: Date;
  member?: Member;
}
