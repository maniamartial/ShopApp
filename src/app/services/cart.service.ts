import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Adds a product to the cart
  addToCart(product: CartItem): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      currentCart.push(product);
    }
    this.cartItemsSubject.next(currentCart);
  }

  // Updates the quantity of an item
  updateQuantity(itemId: number, quantity: number): void {
    const currentCart = this.cartItemsSubject.getValue();
    const item = currentCart.find((item) => item.id === itemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.cartItemsSubject.next(currentCart);
    }
  }

  // Removes an item from the cart
  removeFromCart(itemId: number): void {
    const updatedCart = this.cartItemsSubject
      .getValue()
      .filter((item) => item.id !== itemId);

    this.cartItemsSubject.next(updatedCart);
  }

  // Get total price of the cart
  getTotalPrice(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((sum, item) => sum + item.total, 0);
  }
}
