import { Component, inject, signal } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-customer-orders',
    imports: [DatePipe, NgClass, TitleCasePipe, FormsModule],
    templateUrl: './customer-orders.html'
})
export class CustomerOrders {
  orders = signal<Order[]>([]);
  orderService=inject(OrderService);
  
  ngOnInit(){
    this.orderService.getCustomerOrders().subscribe((result)=>{
      this.orders.set(result);
    })
  }

  sellingPrice(amt:number,dis:number){
    return Math.round(amt*(1-dis/100));
  }
}
