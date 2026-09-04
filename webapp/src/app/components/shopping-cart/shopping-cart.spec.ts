import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ShoppingCart } from './shopping-cart';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../types/cartItem';
import { Product } from '../../types/product';

function product(Price: number, discount: number): Product {
  return {
    _id: 'p' + Price, name: 'x', shortDescription: 'x', description: 'x',
    Price, discount, images: [], CategoryID: 'c1', isFeatured: false, New: false,
  };
}

describe('ShoppingCart pricing', () => {
  const items = signal<CartItem[]>([]);

  function build() {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: { items, init: () => {} } },
        { provide: OrderService, useValue: {} },
        { provide: ToastrService, useValue: { show: () => {} } },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
      ],
    });
    return TestBed.runInInjectionContext(() => new ShoppingCart());
  }

  it('applies the percentage discount', () => {
    expect(build().sellingPrice(product(1000, 10))).toBe(900);
  });

  it('rounds a fractional discounted price', () => {
    // 849.15 rounds to 849
    expect(build().sellingPrice(product(999, 15))).toBe(849);
  });

  it('leaves an undiscounted price untouched', () => {
    expect(build().sellingPrice(product(499, 0))).toBe(499);
  });

  it('totals the cart, then adds 12% tax on top of the subtotal', () => {
    items.set([
      { product: product(1000, 10), quantity: 2 },  // 900 x 2
      { product: product(499, 0), quantity: 1 },    //           499
    ]);
    const component = build();

    expect(component.getSubAmount()).toBe(2299);
    expect(component.tax).toBe(276);              // 275.88 rounds up
    expect(component.totalAmount).toBe(2575);
  });

  it('reports an empty cart as zero rather than NaN', () => {
    items.set([]);
    const component = build();

    expect(component.getSubAmount()).toBe(0);
    expect(component.tax).toBe(0);
    expect(component.totalAmount).toBe(0);
  });

  it('starts on the cart step', () => {
    expect(build().orderStep()).toBe(0);
  });
});
