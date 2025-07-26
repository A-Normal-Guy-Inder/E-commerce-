import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
  orders:Order[]=[];
  orderService=inject(OrderService);
  
  ngOnInit(){
    this.orderService.getCustomerOrders().subscribe((result)=>{
      this.orders=result;
      console.log(this.orders);
    })
  }

  sellingPrice(amt:number,dis:number){
    return Math.round(amt*(1-dis/100));
  }
}
