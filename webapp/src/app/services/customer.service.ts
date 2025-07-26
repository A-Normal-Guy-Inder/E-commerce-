import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';
import { Category } from '../types/Category';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient);

  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl + "/customer/new-products");
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl + "/customer/featured-products");
  }

  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl + "/customer/categories");
  }

  getBrands(){
    return this.http.get<Category[]>(environment.apiUrl + "/customer/brands");
  }

  getProducts(
    searchTerm:string,CategoryID:string,page:number,pageSize:number,sortBy:string,sortOrder:string,brandID:string
  ){
    return this.http.get<Product[]>(environment.apiUrl + `/customer/products?searchTerm=${searchTerm}&CategoryID=${CategoryID}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandID=${brandID}`)
  }

  getProductById(id:string){
    return this.http.get<Product>(environment.apiUrl+"/customer/products/"+id);
  }
  
  constructor() { }
}
