import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contactus } from '../types/contactus';
import { User } from '../types/user';

/* Identity from /auth/me */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly currentUser = signal<User | null>(null);
  /* False until resolved */
  private readonly resolved = signal(false);

  readonly user = this.currentUser.asReadonly();
  readonly checked = this.resolved.asReadonly();

  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.isAdmin === true);
  readonly userName = computed(() => this.currentUser()?.name ?? '');
  readonly userEmail = computed(() => this.currentUser()?.email ?? '');
  readonly userRole = computed(() =>
    this.currentUser() ? (this.currentUser()!.isAdmin ? 'Admin' : 'Customer') : ''
  );

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + "/auth/register", {
      name, email, password
    });
  }

  /* Token arrives as cookie */
  async login(email: string, password: string): Promise<User> {
    const result = await firstValueFrom(
      this.http.post<{ user: User }>(environment.apiUrl + "/auth/login", { email, password })
    );
    this.currentUser.set(result.user);
    this.resolved.set(true);
    return result.user;
  }

  /* Safe when signed out */
  async fetchCurrentUser(): Promise<User | null> {
    try {
      const result = await firstValueFrom(
        this.http.get<{ user: User }>(environment.apiUrl + "/auth/me")
      );
      this.currentUser.set(result.user ?? null);
      return this.currentUser();
    } catch {
      this.currentUser.set(null);
      return null;
    } finally {
      this.resolved.set(true);
    }
  }

  getContactUsMessages() {
    return this.http.get<Contactus[]>(environment.apiUrl + "/auth/contact-us");
  }

  /* Server clears the cookie */
  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post(environment.apiUrl + "/auth/logout", {}));
    } finally {
      this.currentUser.set(null);
      this.resolved.set(true);
    }
  }
}
