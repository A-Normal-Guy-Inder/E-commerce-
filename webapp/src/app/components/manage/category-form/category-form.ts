import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-category-form',
    imports: [FormsModule, MatInputModule, MatButtonModule],
    templateUrl: './category-form.html'
})
export class CategoryForm {
  name = signal<string>('');
  categoryservice=inject(CategoryService);
  constructor(private toastr:ToastrService){}
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  id!:string;
  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit=true;
      this.categoryservice.getCategorybyId(this.id).subscribe((result:any)=>{
        this.name.set(result.name);
      });
    }
  }
  add(){
    this.categoryservice.addCategory(this.name()).subscribe((result :any)=>{
      this.toastr.success('Success','Category Added');
      this.router.navigateByUrl("/admin/categories");
    });
  }
  update(){
    this.categoryservice.updateCategory(this.id,this.name()).subscribe((result :any)=>{
      this.toastr.success('Success','Category Updated');
      this.router.navigateByUrl("/admin/categories");
    });
  }
}
