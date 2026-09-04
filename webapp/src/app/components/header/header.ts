import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    imports: [RouterLink, FormsModule, MatIconModule],
    templateUrl: './header.html'
})
export class Header {
  customerService = inject(CustomerService);
  authService = inject(AuthService);
  router = inject(Router);

  /* Signal, no subscription */
  categoryList = this.customerService.categories;
  searchTerm!: string;

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl("products?search=" + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = "";
    this.router.navigateByUrl("products?CategoryID=" + id);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
