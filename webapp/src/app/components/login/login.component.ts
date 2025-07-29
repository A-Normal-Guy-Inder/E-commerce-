import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder=inject(FormBuilder);
  showPassword=false;
  errorMessage:string = '';
  loginForm=this.formbuilder.group({
    email:['',[Validators.required,Validators.email]],
    password: [
      '',
      [
         Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]
    ]
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  authService=inject(AuthService);
  router=inject(Router);
  login(){
    let value=this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe(
      (result: any) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        this.router.navigateByUrl("/");
      },
      (err) => {
        if (err.status === 400 && err.error?.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = "Something went wrong. Please try again.";
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);

        console.error(err);
      }
    );
  }
}
