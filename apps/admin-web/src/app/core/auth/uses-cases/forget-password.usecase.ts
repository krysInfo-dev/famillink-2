import { injectAuthRepository } from '../domain/ports/auth.config';
import { Observable } from 'rxjs';
import { ForgetPasswordInformationsModel } from '../domain/models/forget-password-informations.model';

export function injectForgetPasswordUseCase() {
  const repo = injectAuthRepository();

  return {
    execute(forgetPasswordInformations: ForgetPasswordInformationsModel): Observable<void> {
      return repo.forgetPassword(forgetPasswordInformations);
    }
  };
}
