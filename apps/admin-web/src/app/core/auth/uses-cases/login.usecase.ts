import { injectAuthRepository } from '../domain/ports/auth.config';
import { LoginInformationsModel } from '../domain/models/login-informations.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResultModel } from '../domain/models/login-result.model';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export function injectLoginUseCase() {
  const repo = injectAuthRepository();
  const localStorageService = inject(LocalStorageService);

  return {
    execute(loginInformations: LoginInformationsModel): Observable<LoginResultModel | undefined> {
      return repo.login(loginInformations).pipe(map(result => {
        if (result) {
          localStorageService.storeUserInfos(result);
        }
        return result;
      }));
    }
  };
}
