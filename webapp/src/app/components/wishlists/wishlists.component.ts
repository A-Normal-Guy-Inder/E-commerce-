import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent,NgFor,NgIf],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent {
  wishlistService=inject(WishlistService);
  ngOnInit(){
    this.wishlistService.init();
  }
}
