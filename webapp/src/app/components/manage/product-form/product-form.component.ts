import { NgFor, NgIf } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../types/Category';
import { Brand } from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,MatSelectModule, NgFor,NgIf,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder=inject(FormBuilder);
  productForm=this.formBuilder.group({
    name:[null,[Validators.required,Validators.minLength(5)]],
    shortDescription: [null,[Validators.required,Validators.minLength(10)]],
    description: [null,[Validators.required,Validators.minLength(50)]],
    Price: [null,[Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    CategoryID: [null,[Validators.required]],
    brandID: [null,[Validators.required]],
    isFeatured: [false],
    New: [false],
  });

  CategoryService=inject(CategoryService);
  BrandService=inject(BrandService);
  ProductService=inject(ProductService);
  toastr=inject(ToastrService);
  router=inject(Router);
  route=inject(ActivatedRoute);

  categories:Category[]=[];
  brand:Brand[]=[];
  id!:string;

  ngOnInit() {
    this.fetchCategories();
    this.fetchBrand();

    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.ProductService.getProductById(this.id).subscribe((result:any)=>{
        for(let idx=0;idx<result.images.length;idx++){
          this.addImage(); 
        }
        this.productForm.patchValue(result);
      });
    }
    else{
      this.addImage(); 
    }
  }

  
  fetchCategories() {
    this.CategoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res; 
      },
    });
  }

  fetchBrand() {
    this.BrandService.getBrands().subscribe({
      next: (res) => {
        this.brand = res; 
      },
    });
  }

  addImage(){
    this.images.push(this.formBuilder.control(null));
  }
  get images(){
    return this.productForm.get('images') as FormArray;
  }
  removeImage(idx:number){
    this.images.removeAt(idx);
  }

  addProduct(){
    let value = this.productForm.value;
    this.ProductService.addProduct(value as any).subscribe((result)=>{
      this.toastr.success('Success','Product Added');
      this.router.navigateByUrl("/admin/products");
    });
  }
  
  updateProduct(){
    let value = this.productForm.value;
    this.ProductService.updateProduct(this.id,value as any).subscribe((result)=>{
      this.toastr.success('Success','Product Updated');
      this.router.navigateByUrl("/admin/products");
    });
  }
}
