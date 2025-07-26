import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  constructor() { }

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + "/auth/register", {
      name, email, password
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + "/auth/login", {
      email, password
    });
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp && decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  get isAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get userName(): string | false {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return false;
  }

  get userEmail(): string | false {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return false;
  }

  get userRole(): string | false {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin === true ? "Admin" : "Customer";
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
