import { inject, Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { ERoleModel } from '../../users/domain/models/enum-role.model';
import { LoginResultModel } from '../domain/models/login-result.model';

export const USER_ID_KEY = 'user_id';
export const USER_NAME_KEY = 'user_name';
export const USER_FULL_NAME_KEY = 'user_full_name';
export const USER_ROLE_KEY = 'user_role';
export const USER_MEMBER_ID = 'user_member_id';
export const USER_TOKEN_KEY = 'user_token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private readonly jwtService = inject(JwtService);

  logout() {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(USER_FULL_NAME_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USER_MEMBER_ID);
    localStorage.removeItem(USER_TOKEN_KEY);
  }

  storeUserInfos(infos: LoginResultModel): void {
    localStorage.setItem(USER_ID_KEY, String(infos.id));
    localStorage.setItem(USER_NAME_KEY, infos.username);
    localStorage.setItem(USER_FULL_NAME_KEY, infos.fullName);
    localStorage.setItem(USER_ROLE_KEY, infos.role);
    localStorage.setItem(
      USER_MEMBER_ID,
      infos.memberId ? String(infos.memberId) : ''
    );
    localStorage.setItem(USER_TOKEN_KEY, infos.token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(USER_TOKEN_KEY) as string;
    return (
      token !== null &&
      token !== undefined &&
      !this.jwtService.isTokenExpired(token)
    );
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getUserInfos(): LoginResultModel {
    return {
      id: Number(localStorage.getItem(USER_ID_KEY)),
      username: localStorage.getItem(USER_NAME_KEY) as string,
      fullName: localStorage.getItem(USER_FULL_NAME_KEY) as string,
      role: localStorage.getItem(USER_ROLE_KEY) as ERoleModel,
      memberId: Number(localStorage.getItem(USER_MEMBER_ID)),
      token: localStorage.getItem(USER_TOKEN_KEY) as string,
    };
  }

  getUserMemberId(): number {
    return Number(localStorage.getItem(USER_MEMBER_ID));
  }

  isSuperAdmin(): boolean {
    return (localStorage.getItem(USER_ROLE_KEY) as ERoleModel) === ERoleModel.SuperAdmin;
  }

  isAdmin(): boolean {
    return (localStorage.getItem(USER_ROLE_KEY) as ERoleModel) === ERoleModel.Admin;
  }

  isSimpleUser(): boolean {
    return (localStorage.getItem(USER_ROLE_KEY) as ERoleModel) === ERoleModel.User;
  }

}
