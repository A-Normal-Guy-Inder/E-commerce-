import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../types/order';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatSelectModule,FormsModule,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderService=inject(OrderService);
  toastr=inject(ToastrService);
  orders:Order[]=[];

  ngOnInit(){
    this.orderService.getAdminOrders().subscribe((result)=>{
      this.orders=result;
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
