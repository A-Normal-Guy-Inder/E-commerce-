import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor() { }
  http=inject(HttpClient);
  wishlists:Product[]=[];

  init(){
    return this.getWishlists().subscribe((result)=>{
      this.wishlists=result;
    });
  };

  getWishlists(){
    return this.http.get<Product[]>(environment.apiUrl +"/customer/wishlists");
  }

  addInWishlists(pid:string){
    return this.http.post(environment.apiUrl +"/customer/wishlists/"+pid,{});
  }

  removeFromWishlists(pid:string){
    return this.http.delete(environment.apiUrl +"/customer/wishlists/"+pid);
  }
}
