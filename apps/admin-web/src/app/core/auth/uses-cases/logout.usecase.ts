import { injectAuthRepository } from '../domain/ports/auth.config';
import { Observable } from 'rxjs';
import { LogoutInformationsModel } from '../domain/models/logout-informations.model';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export function injectLogoutUseCase() {
  const repo = injectAuthRepository();
  const localStorageService = inject(LocalStorageService);

  return {
    execute(): Observable<void> {
      const logoutInfo: LogoutInformationsModel = {
        token: localStorageService.getUserInfos().token,
        userId: localStorageService.getUserInfos().id,
      };
      localStorageService.logout();
      return repo.logout(logoutInfo);
    }
  };
}
