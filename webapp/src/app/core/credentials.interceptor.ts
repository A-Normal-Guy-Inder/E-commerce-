import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

/*
 * Replaces the old Authorization-header interceptor. The session is an
 * httpOnly cookie, so the browser only attaches it when the request opts in
 * to credentials — and cross-site requests need that flag explicitly.
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiUrl)) {
    req = req.clone({ withCredentials: true });
  }
  return next(req);
};
