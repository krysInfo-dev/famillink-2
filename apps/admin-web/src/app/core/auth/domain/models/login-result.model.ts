import { ERoleModel } from '../../../users/domain/models/enum-role.model';


export class LoginResultModel {
  id!: number;
  username!: string;
  fullName!: string;
  role!: ERoleModel;
  memberId?: number;
  token!: string;
}
