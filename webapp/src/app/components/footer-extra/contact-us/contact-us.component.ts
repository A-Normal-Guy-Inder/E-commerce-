import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Contactus } from '../../../types/contactus';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  custService = inject(CustomerService);
  authSevice = inject(AuthService);
  toastr = inject(ToastrService);
    messages:Contactus[]=[];
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(this.authSevice.isAdmin){
      this.authSevice.getContactUsMessages().subscribe(result => {
        this.messages = result;
      });
    }
  }
  formBuilder = inject(FormBuilder);
  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.custService.addContactUsMessage(formData.name as string, formData.email as string, formData.message as string ).subscribe(()=>{
        this.toastr.success('Your message has been sent successfully!');
      });
      this.contactForm.reset();
    } else {
      this.toastr.error('Form is invalid');
    }
  }

}
