import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formbuilder=inject(FormBuilder);
  showPassword=false;
  registerForm=this.formbuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password: [
      '',
      [
         Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]
    ]
  });

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  authService=inject(AuthService);
  toastr=inject(ToastrService);
  router=inject(Router);
  register(){
    let value=this.registerForm.value;
    this.authService.register(value.name!,value.email!,value.password!).subscribe((result)=>{
      this.toastr.success('Success','User Registered');
    });
    this.router.navigateByUrl("/login");
  }
}
