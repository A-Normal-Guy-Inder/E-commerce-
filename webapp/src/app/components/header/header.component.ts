import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../types/Category';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  customerService = inject(CustomerService);
  authService = inject(AuthService);
  router = inject(Router);

  categoryList: Category[] = [];
  searchTerm!: string;
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.isLoggedIn) {
      this.customerService.categories$.subscribe((result) => {
      this.categoryList = result;
    });
    }
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl("products?search=" + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = "";
    this.router.navigateByUrl("products?CategoryID=" + id);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
