
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [MatInputModule, ReactiveFormsModule],
    templateUrl: './login.html'
})
export class Login {
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
  async login(){
    let value=this.loginForm.value;
    try {
      /* The session cookie is set by the server; nothing is stored here */
      await this.authService.login(value.email!, value.password!);
      this.router.navigateByUrl("/");
    } catch (err: any) {
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
  }
}
