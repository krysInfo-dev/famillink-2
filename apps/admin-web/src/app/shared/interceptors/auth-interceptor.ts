import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_TOKEN_KEY } from '../../core/auth/services/local-storage.service';
import { EnvironmentUtilsService } from '../utils/environment-utils.service';
import { inject } from '@angular/core';

const URL_WITH_API_KEY = ['forget-password', 'verify-reset-password-token', 'reset-password']

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const environment = inject(EnvironmentUtilsService);
  if (URL_WITH_API_KEY.some(u => request.url.includes(u))) {
    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${environment.getInternalApiKey()}`)
    });
    return next(cloned);
  }
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (!token) {
    return next(request);
  }
  const cloned = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(cloned);
}
