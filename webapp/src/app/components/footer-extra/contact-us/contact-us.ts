
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Contactus } from '../../../types/contactus';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-contact-us',
    imports: [ReactiveFormsModule],
    templateUrl: './contact-us.html'
})
export class ContactUs {
  custService = inject(CustomerService);
  authSevice = inject(AuthService);
  toastr = inject(ToastrService);
  messages = signal<Contactus[]>([]);
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(this.authSevice.isAdmin()){
      this.authSevice.getContactUsMessages().subscribe(result => {
        this.messages.set(result);
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
