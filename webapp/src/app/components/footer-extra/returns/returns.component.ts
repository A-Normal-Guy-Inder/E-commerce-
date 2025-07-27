import { Component } from '@angular/core';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.scss'
})
export class ReturnsComponent {
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
