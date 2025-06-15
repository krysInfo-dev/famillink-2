import { InjectionToken, inject } from '@angular/core';
import { AuthRepository } from './auth.repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AuthRepository');

export function injectAuthRepository(): AuthRepository {
  return inject(AUTH_REPOSITORY);
}
