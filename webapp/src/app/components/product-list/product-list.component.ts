import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/Category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'apage-product-list',
  standalone: true,
  imports: [ProductCardComponent,NgIf,NgFor,MatSelectModule,NgFor,FormsModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerService=inject(CustomerService);
  searchTerm:string='';
  CategoryID:string='';
  sortBy:string='';
  sortOrder:string='';
  brandID:string='';
  page=1;
  pageSize=6;
  products:Product[]=[];
  category:Category[]=[];
  brand:Brand[]=[];
  route=inject(ActivatedRoute);

  ngOnInit(){
    this.getCategories();
    this.getBrands();
    this.route.queryParams.subscribe((x:any)=>{
      this.searchTerm=x.search || '';
      this.CategoryID=x.CategoryID || '';
      this.getProducts();
    })
  };

  getCategories(){
    this.customerService.getCategories().subscribe((result)=>{
      this.category=result;
    });
  }

  getBrands(){
    this.customerService.getBrands().subscribe((result)=>{
      this.brand=result;
    });
  }

  orderChange(event:any){
    this.sortBy='Price';
    this.sortOrder=event;
    this.getProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / 6);
  }
  
  pageChange(page:number){
    this.page=page;
    this.getProducts();
  }

  getProducts(){
    setTimeout(()=>{
      this.customerService.getProducts(
      this.searchTerm,this.CategoryID,this.page,this.pageSize,this.sortBy,this.sortOrder,this.brandID
    ).subscribe((result)=>{
      this.products=result;
    });
    },50);
  };
}
