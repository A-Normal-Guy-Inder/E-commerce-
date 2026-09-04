import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Order } from '../../../types/order';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-orders',
    imports: [DatePipe, NgClass, TitleCasePipe, MatSelectModule, FormsModule, MatButtonToggleModule],
    templateUrl: './orders.html'
})
export class Orders {
  orderService=inject(OrderService);
  toastr=inject(ToastrService);
  orders = signal<Order[]>([]);

  ngOnInit(){
    this.orderService.getAdminOrders().subscribe((result)=>{
      this.orders.set(result);
    })
  }

  sellingPrice(amt:number,dis:number):number{
    return Math.round(amt*(1-dis/100));
  }

  updateOrderStatus(order:Order){
    this.orderService.updateOrderStatus(order._id as string,order.status as string).subscribe((result)=>{
      this.toastr.show('','Order Status Updated');
    });
  }
}
