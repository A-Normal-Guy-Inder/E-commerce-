import { Component } from '@angular/core';

@Component({
    selector: 'app-returns',
    imports: [],
    templateUrl: './returns.html'
})
export class Returns {
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
