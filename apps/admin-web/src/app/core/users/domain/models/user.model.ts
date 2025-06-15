import { ERoleModel } from './enum-role.model';
import { Member } from '../../../members/domain/models/member';

export class UserModel {
  id!: number;
  userName!: string;
  password!: string;
  role!: ERoleModel;
  inactivated!: boolean;
  causeOfInactivation?: string;
  inactivatedDate?: Date;
  member?: Member;
}
