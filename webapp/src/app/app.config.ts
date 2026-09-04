import { ApplicationConfig, provideAppInitializer, provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { credentialsInterceptor } from './core/credentials.interceptor';
import { loaderHttpInterceptor } from './interceptors/loader.interceptor';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    /* Zoneless: change detection is driven by signals, not zone.js */
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
        loaderHttpInterceptor
      ])
    ),
    /*
     * Resolve the cookie session once before the first route activates, so
     * guards and templates can read the auth signals synchronously.
     */
    provideAppInitializer(() => inject(AuthService).fetchCurrentUser()),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-center-center',
      timeOut: 2000,
      preventDuplicates: true,
      newestOnTop: true,
      maxOpened: 1,
      autoDismiss: true
    }),
  ]
};
