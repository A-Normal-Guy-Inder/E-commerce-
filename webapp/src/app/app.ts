import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { Loader } from './components/loader/loader';
import { CustomerService } from './services/customer.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatButtonModule, Header, Footer, Loader],
    templateUrl: './app.html'
})
export class App {

  title = 'webapp';
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  customerService = inject(CustomerService);

  ngOnInit() {
    /* Session already resolved */
    if (this.authService.isLoggedIn()) {
      this.wishlistService.init();
      this.cartService.init();
      this.customerService.fetchCategories();
    }
  }
}
