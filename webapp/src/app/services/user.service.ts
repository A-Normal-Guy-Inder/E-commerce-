import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../types/user';
import { environment } from '../../environments/environment';

/* Admin-only: every endpoint sits behind verifyToken + isAdmin on the API */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl + "/users");
  }

  getUserById(id: string) {
    return this.http.get<User>(environment.apiUrl + "/users/" + id);
  }

  setUserRole(id: string, isAdmin: boolean) {
    return this.http.patch<User>(environment.apiUrl + "/users/" + id + "/role", {
      isAdmin
    });
  }

  deleteUserById(id: string) {
    return this.http.delete(environment.apiUrl + "/users/" + id);
  }
}
