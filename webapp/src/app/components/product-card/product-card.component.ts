import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterLink,MatButtonModule,MatIconModule,NgIf],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

  @Input() product!: Product;
  wishlistService=inject(WishlistService);
  cartService=inject(CartService);

  getOptimizedImage(url: string): string {
    if (!url) return '';
    return url.includes('_AC_') ? url : url.replace('.jpg', '._AC_SX200_.jpg');
  }

  get sellingPrice(){
    return Math.round(this.product.Price*(100-this.product.discount)/100);
  }

  addToWishlist(product:Product){
    if(this.isInWishlist(product)){
      this.wishlistService.removeFromWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    }
    else{
      this.wishlistService.addInWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product:Product){
    let isExists=this.wishlistService.wishlists.find(x=>x._id==product._id);
    if(isExists)
      return true;
    else
      return false;
  }

  addToCart(product:Product){
    if(!this.isProductInCart(product._id as string))
    {
      this.cartService.addToCart(product._id as string,1).subscribe(()=>{
        this.cartService.init();
      });
    }
    else{
      this.cartService.removeFromCart(product._id as string).subscribe(()=>{
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string): boolean {
    return this.cartService.items.some(x => x.product._id === productId);
  }
}
