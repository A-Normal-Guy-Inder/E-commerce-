import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { credentialsInterceptor } from './credentials.interceptor';
import { environment } from '../../environments/environment';

/* Without withCredentials the browser never attaches the httpOnly session cookie. */
describe('credentialsInterceptor', () => {
  let http: HttpClient;
  let mock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    mock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => mock.verify());

  it('sends credentials to the application API', () => {
    http.get(environment.apiUrl + '/customer/products').subscribe();
    expect(mock.expectOne(environment.apiUrl + '/customer/products').request.withCredentials).toBeTrue();
  });

  it('does not leak credentials to third-party hosts', () => {
    http.get('https://images.example.com/photo.jpg').subscribe();
    expect(mock.expectOne('https://images.example.com/photo.jpg').request.withCredentials).toBeFalse();
  });
});
