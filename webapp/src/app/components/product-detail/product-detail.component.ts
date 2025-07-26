import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgFor,NgIf,ProductCardComponent,MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  customerService=inject(CustomerService);
  route=inject(ActivatedRoute);
  product!:Product;
  selectedImage: string = '';
  similarProducts:Product[]=[];
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
      this.product=result;
      this.customerService.getProducts('',this.product.CategoryID as string,1,4,'','','').subscribe((result)=>{
        this.similarProducts=result;
      });
    });
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
