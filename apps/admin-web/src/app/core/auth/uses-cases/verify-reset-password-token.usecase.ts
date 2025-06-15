import { injectAuthRepository } from '../domain/ports/auth.config';
import { Observable } from 'rxjs';
import { VerifyResetPasswordTokenModel } from '../domain/models/verify-reset-password-token.model';
import { UserModel } from '../../users/domain/models/user.model';

export function injectVerifyResetPasswordTokenUseCase() {
  const repo = injectAuthRepository();

  return {
    execute(verifyResetPasswordToken: VerifyResetPasswordTokenModel):Observable<UserModel | undefined> {
      return repo.verifyResetPasswordToken(verifyResetPasswordToken);
    }
  };
}
