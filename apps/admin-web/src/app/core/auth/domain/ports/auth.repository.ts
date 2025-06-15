import { LoginInformationsModel } from '../models/login-informations.model';
import { LoginResultModel } from '../models/login-result.model';
import { LogoutInformationsModel } from '../models/logout-informations.model';
import { ForgetPasswordInformationsModel } from '../models/forget-password-informations.model';
import { VerifyResetPasswordTokenModel } from '../models/verify-reset-password-token.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { UserModel } from '../../../users/domain/models/user.model';
import { Observable } from 'rxjs';

export interface AuthRepository {
  login(loginInformations: LoginInformationsModel): Observable<LoginResultModel | undefined>;
  logout(logoutInformations: LogoutInformationsModel): Observable<void>;
  forgetPassword(forgetPasswordInformations: ForgetPasswordInformationsModel): Observable<void>;
  verifyResetPasswordToken(verifyResetPasswordToken: VerifyResetPasswordTokenModel):Observable<UserModel | undefined>;
  resetPassword(resetPassword: ResetPasswordModel): Observable<void>;
}
