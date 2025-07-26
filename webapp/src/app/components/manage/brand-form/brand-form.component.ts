import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatButtonModule, NgIf],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name !:string;
  brandservice=inject(BrandService);
  constructor(private toastr:ToastrService){}
  router=inject(Router);
  route=inject(ActivatedRoute);
  id!:string;
  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.brandservice.getBrandbyId(this.id).subscribe((result:any)=>{
        this.name=result.name;
      });
    }
  }
  add(){
    this.brandservice.addBrand(this.name).subscribe((result :any)=>{
      this.toastr.success('Success','Brand Added');
      this.router.navigateByUrl("/admin/brands");
    });
  }
  update(){
    this.brandservice.updateBrand(this.id,this.name).subscribe((result :any)=>{
      this.toastr.success('Success','Brand Updated');
      this.router.navigateByUrl("/admin/brands");
    });
  }
}
