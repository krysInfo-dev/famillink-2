import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { appRoutes } from './app.routes';
import { HttpAuthRepository } from './infrastructure/auth/repository/http-auth.repository';
import { AUTH_REPOSITORY } from './core/auth/domain/ports/auth.config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),
    { provide: AUTH_REPOSITORY, useExisting: HttpAuthRepository }
  ]
};
