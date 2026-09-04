import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';

import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shopping-cart',
    imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatRadioModule],
    templateUrl: './shopping-cart.html'
})
export class ShoppingCart {
  cartService=inject(CartService);
  tax:number = 0;
  totalAmount:number = 0;

  ngOnInit(){
    this.cartService.init();
  }

  sellingPrice(product:Product){
    return Math.round(product.Price*(100-product.discount)/100);
  }

  roundPrice(value: number): number {
    return Math.round(value);
  }

  addToCart(productId:string,quantity:number){
    this.cartService.addToCart(productId,quantity).subscribe(()=>{
      if(this.cartService.items())
      this.cartService.init();
    });
  }

  getSubAmount(){
    let amount=0;
    const cartItems = this.cartService.items();
    for(let i=0;i<cartItems.length;i++){
      const element= cartItems[i];
      amount += this.sellingPrice(element.product)*element.quantity;
    }
    this.tax= Math.round(amount * 0.12);
    this.totalAmount=(amount + this.tax);
    return amount;
  }

  removeFromCart(product:Product){
    this.cartService.removeFromCart(product._id as string).subscribe(()=>{
        this.cartService.init();
      });
  }

  orderStep = signal<number>(0);
  formbuilder=inject(FormBuilder);

  addressForm = this.formbuilder.group({
    address1: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    pincode: ['', Validators.required]
  });

  checkout(){
    this.orderStep.set(1);
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.orderStep.set(2);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  paymentType="cash";

  orderService=inject(OrderService);
  router=inject(Router);
  toastr=inject(ToastrService);
  completeOrder(){
    let order:Order ={
      items:this.cartService.items(),
      paymentType:this.paymentType,
      address:this.addressForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };

    this.orderService.addOrder(order).subscribe((result)=>{
      this.toastr.show('Your Order is Placed');
      this.cartService.init();
      this.orderStep.set(0);
      this.router.navigateByUrl("/orders");
    });
  }
}
