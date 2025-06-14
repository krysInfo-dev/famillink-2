import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../../core/auth/domain/ports/auth.repository';
import { HttpClient } from '@angular/common/http';
import { ForgetPasswordInformationsModel } from '../../../core/auth/domain/models/forget-password-informations.model';
import { LoginInformationsModel } from '../../../core/auth/domain/models/login-informations.model';
import { LoginResultModel } from '../../../core/auth/domain/models/login-result.model';
import { LogoutInformationsModel } from '../../../core/auth/domain/models/logout-informations.model';
import { ResetPasswordModel } from '../../../core/auth/domain/models/reset-password.model';
import { VerifyResetPasswordTokenModel } from '../../../core/auth/domain/models/verify-reset-password-token.model';
import { UserModel } from '../../../core/users/domain/models/user.model';
import { Observable } from 'rxjs';
import { EnvironmentUtilsService } from '../../../shared/utils/environment-utils.service';

const BASE_URL = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthRepository implements AuthRepository {

  readonly #http = inject(HttpClient);
  readonly environment = inject(EnvironmentUtilsService);

  login(loginInformations: LoginInformationsModel): Observable<LoginResultModel | undefined> {
    return this.#http.post<LoginResultModel>(this.environment.getBaseUrl(BASE_URL) + '/login', loginInformations);
  }

  logout(logoutInformations: LogoutInformationsModel): Observable<void> {
    return this.#http.post<void>(
      this.environment.getBaseUrl(BASE_URL) + '/logout',
      logoutInformations
    );
  }

  forgetPassword(
    forgetPasswordInformations: ForgetPasswordInformationsModel,
  ): Observable<void> {
    return this.#http.post<void>(
      this.environment.getBaseUrl(BASE_URL) + '/forget-password',
      forgetPasswordInformations
    );
  }

  verifyResetPasswordToken(
    verifyResetPasswordToken: VerifyResetPasswordTokenModel,
  ): Observable<UserModel> {
    return this.#http.post<UserModel>(
      this.environment.getBaseUrl(BASE_URL) + '/verify-reset-password-token',
      verifyResetPasswordToken
    );
  }

  resetPassword(resetPassword: ResetPasswordModel): Observable<void> {
    return this.#http.post<void>(
      this.environment.getBaseUrl(BASE_URL) + '/reset-password',
      resetPassword
    );
  }
}
