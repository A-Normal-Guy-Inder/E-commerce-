import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';

import { ProductCard } from '../product-card/product-card';
import { CarouselModule,OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-home',
    imports: [ProductCard, CarouselModule, RouterLink],
    templateUrl: './home.html'
})
export class Home {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }

  customerService=inject(CustomerService);
  wishlistService=inject(WishlistService);
  cartService=inject(CartService);
  newProducts = signal<Product[]>([]);
  FeaturedProducts = signal<Product[]>([]);
  bannerImages = signal<Product[]>([]);

  ngOnInit(){
    this.getnew();
    this.getfeatured();
  };

  getnew(){
    this.customerService.getNewProducts().subscribe((result)=>{
      this.newProducts.set(result);
      this.bannerImages.update((items) => [...items, ...result]);
    });
  };

  getfeatured(){
    this.customerService.getFeaturedProducts().subscribe((result)=>{
      this.FeaturedProducts.set(result);
      this.bannerImages.update((items) => [...items, ...result]);
    });
  }

  getOptimizedImage(url: string): string {
  if (!url) return '';
  return url.includes('_AC_') ? url : url.replace('.jpg', '._AC_SX350_.jpg');
  }
}
