import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCard } from '../product-card/product-card';


@Component({
    selector: 'app-wishlists',
    imports: [ProductCard],
    templateUrl: './wishlists.html'
})
export class Wishlists {
  wishlistService=inject(WishlistService);
  ngOnInit(){
    this.wishlistService.init();
  }
}
