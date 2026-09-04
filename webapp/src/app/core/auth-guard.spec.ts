import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth.service';

/* The session is resolved before the first activation, so the guard reads signals synchronously. */
describe('authGuard', () => {
  function configure(signedIn: boolean) {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: signal(signedIn) } },
        { provide: Router, useValue: { createUrlTree: (path: string[]) => ({ redirectedTo: path.join('/') }) } },
      ],
    });
  }

  const run = () => TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  it('lets a signed-in visitor through', () => {
    configure(true);
    expect(run()).toBeTrue();
  });

  it('sends a signed-out visitor to /login', () => {
    configure(false);
    expect(run() as any).toEqual({ redirectedTo: '/login' });
  });
});
