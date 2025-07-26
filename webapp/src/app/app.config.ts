import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { tokenHttpInterceptor } from './core/token-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenHttpInterceptor])),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-center-center',
      timeOut: 2000,
      preventDuplicates: true,
      newestOnTop: true,
      maxOpened: 1,
      autoDismiss: true,
    }),
  ]
};
