import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* Cookie needs withCredentials */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiUrl)) {
    req = req.clone({ withCredentials: true });
  }
  return next(req);
};
