import { injectAuthRepository } from '../domain/ports/auth.config';
import { Observable } from 'rxjs';
import { ResetPasswordModel } from '../domain/models/reset-password.model';

export function injectResetPasswordUseCase() {
  const repo = injectAuthRepository();

  return {
    execute(resetPassword: ResetPasswordModel): Observable<void> {
      return repo.resetPassword(resetPassword);
    }
  };
}
