import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.html'
})
export class CustomerProfile {
  authService = inject(AuthService);
  router = inject(Router);

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
