import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('starts signed out and unresolved', () => {
    expect(service.user()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.checked()).toBeFalse();
  });

  it('populates the identity signals from /auth/me', async () => {
    const pending = service.fetchCurrentUser();
    http.expectOne(environment.apiUrl + '/auth/me')
      .flush({ user: { id: 'u1', name: 'Test', email: 'cust123@gmail.com', isAdmin: true } });
    await pending;

    expect(service.isLoggedIn()).toBeTrue();
    expect(service.userName()).toBe('Test');
    expect(service.userEmail()).toBe('cust123@gmail.com');
    expect(service.userRole()).toBe('Admin');
    expect(service.checked()).toBeTrue();
  });

  /* Live user lacks isAdmin */
  it('treats a missing isAdmin field as a non-admin', async () => {
    const pending = service.fetchCurrentUser();
    http.expectOne(environment.apiUrl + '/auth/me')
      .flush({ user: { id: 'u1', name: 'Test', email: 'cust123@gmail.com' } });
    await pending;

    expect(service.isLoggedIn()).toBeTrue();
    expect(service.isAdmin()).toBeFalse();
    expect(service.userRole()).toBe('Customer');
  });

  it('clears the session and marks it resolved when /auth/me rejects', async () => {
    const pending = service.fetchCurrentUser();
    http.expectOne(environment.apiUrl + '/auth/me')
      .flush({ error: 'Access Denied' }, { status: 401, statusText: 'Unauthorized' });
    await pending;

    expect(service.user()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.checked()).toBeTrue();
  });

  it('signs in from the login response body, which carries no token', async () => {
    const pending = service.login('cust123@gmail.com', 'Hello@123');
    const req = http.expectOne(environment.apiUrl + '/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'cust123@gmail.com', password: 'Hello@123' });
    req.flush({ user: { id: 'u1', name: 'Test', email: 'cust123@gmail.com', isAdmin: false } });
    await pending;

    expect(service.userName()).toBe('Test');
  });

  /* Server must clear cookie */
  it('clears the session by asking the server to expire the cookie', async () => {
    const signIn = service.login('cust123@gmail.com', 'Hello@123');
    http.expectOne(environment.apiUrl + '/auth/login')
      .flush({ user: { id: 'u1', name: 'Test', email: 'cust123@gmail.com', isAdmin: false } });
    await signIn;

    const pending = service.logout();
    const req = http.expectOne(environment.apiUrl + '/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Logged out' });
    await pending;

    expect(service.user()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
