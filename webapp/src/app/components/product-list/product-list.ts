import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';

import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/Category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'apage-product-list',
    imports: [ProductCard, MatSelectModule, FormsModule, MatButtonModule],
    templateUrl: './product-list.html'
})
export class ProductList {
  customerService=inject(CustomerService);
  searchTerm:string='';
  CategoryID = signal<string>('');
  sortBy:string='';
  sortOrder:string='';
  brandID:string='';
  page=1;
  pageSize=6;
  products = signal<Product[]>([]);
  category = signal<Category[]>([]);
  brand = signal<Brand[]>([]);
  route=inject(ActivatedRoute);

  ngOnInit(){
    this.getCategories();
    this.getBrands();
    this.route.queryParams.subscribe((x:any)=>{
      this.searchTerm=x.search || '';
      this.CategoryID.set(x.CategoryID || '');
      this.getProducts();
    })
  };

  getCategories(){
    this.customerService.getCategories().subscribe((result)=>{
      this.category.set(result);
    });
  }

  getBrands(){
    this.customerService.getBrands().subscribe((result)=>{
      this.brand.set(result);
    });
  }

  orderChange(event:any){
    this.sortBy='Price';
    this.sortOrder=event;
    this.getProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.products().length / 6);
  }
  
  pageChange(page:number){
    this.page=page;
    this.getProducts();
  }

  getProducts(){
    setTimeout(()=>{
      this.customerService.getProducts(
      this.searchTerm,this.CategoryID(),this.page,this.pageSize,this.sortBy,this.sortOrder,this.brandID
    ).subscribe((result)=>{
      this.products.set(result);
    });
    },50);
  };
}
