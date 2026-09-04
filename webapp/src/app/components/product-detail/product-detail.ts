import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';

import { ProductCard } from '../product-card/product-card';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-detail',
    imports: [ProductCard, MatIconModule],
    templateUrl: './product-detail.html'
})
export class ProductDetail {
  customerService=inject(CustomerService);
  route=inject(ActivatedRoute);
  product = signal<Product>(undefined as unknown as Product);
  selectedImage: string = '';
  similarProducts = signal<Product[]>([]);
  wishlistService=inject(WishlistService);
  cartService=inject(CartService);

  ngOnInit(){
    this.route.params.subscribe((x:any)=>{
      this.getProductDetails(x.id);
    });
  }

  getProductDetails(id:string){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.customerService.getProductById(id).subscribe((result)=>{
      this.product.set(result);
      this.customerService.getProducts('',this.product().CategoryID as string,1,4,'','','').subscribe((result)=>{
        this.similarProducts.set(result);
      });
    });
  }

  get sellingPrice(){
    const p = this.product();
    return Math.round(p.Price*(100-p.discount)/100);
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
    let isExists=this.wishlistService.wishlists().find(x=>x._id==product._id);
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
    return this.cartService.items().some(x => x.product._id === productId);
  }
}
