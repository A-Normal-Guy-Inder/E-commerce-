import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule,OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,ProductCardComponent,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
  newProducts:Product[]=[];
  FeaturedProducts:Product[]=[];
  bannerImages:Product[]=[];

  ngOnInit(){
    this.getnew();
    this.getfeatured();
  };

  getnew(){
    this.customerService.getNewProducts().subscribe((result)=>{
      this.newProducts=result;
      this.bannerImages.push(...result);
    });
  };

  getfeatured(){
    this.customerService.getFeaturedProducts().subscribe((result)=>{
      this.FeaturedProducts=result;
      this.bannerImages.push(...result);
    });
  }

  getOptimizedImage(url: string): string {
  if (!url) return '';
  return url.includes('_AC_') ? url : url.replace('.jpg', '._AC_SX350_.jpg');
  }
}
