import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { adminGuard } from './admin-guard';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  function configure(signedIn: boolean, isAdmin: boolean) {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: signal(signedIn), isAdmin: signal(isAdmin) } },
        { provide: Router, useValue: { createUrlTree: (path: string[]) => ({ redirectedTo: path.join('/') }) } },
      ],
    });
  }

  const run = () => TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

  it('lets an admin through', () => {
    configure(true, true);
    expect(run()).toBeTrue();
  });

  it('sends a signed-in non-admin back to the storefront', () => {
    configure(true, false);
    expect(run() as any).toEqual({ redirectedTo: '/' });
  });

  it('sends a signed-out visitor to /login rather than the storefront', () => {
    configure(false, false);
    expect(run() as any).toEqual({ redirectedTo: '/login' });
  });
});
