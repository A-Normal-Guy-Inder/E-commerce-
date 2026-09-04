import { Component } from '@angular/core';

@Component({
    selector: 'app-shipping',
    imports: [],
    templateUrl: './shipping.html'
})
export class Shipping {
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
