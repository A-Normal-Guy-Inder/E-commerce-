import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists users from the admin endpoint', () => {
    service.getUsers().subscribe();
    const req = http.expectOne(environment.apiUrl + '/users');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('promotes a user with a boolean body', () => {
    service.setUserRole('abc123', true).subscribe();
    const req = http.expectOne(environment.apiUrl + '/users/abc123/role');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isAdmin: true });
    req.flush({});
  });

  it('demotes a user with a boolean body', () => {
    service.setUserRole('abc123', false).subscribe();
    const req = http.expectOne(environment.apiUrl + '/users/abc123/role');
    expect(req.request.body).toEqual({ isAdmin: false });
    req.flush({});
  });

  it('deletes a user by id', () => {
    service.deleteUserById('abc123').subscribe();
    const req = http.expectOne(environment.apiUrl + '/users/abc123');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
