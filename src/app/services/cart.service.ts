
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
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Realise on refresh it clears the cart, so I decided to store items on localstorage=>Should go to db/cache
  private getCartFromLocalStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCartToLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }

  addToCart(product: CartItem): void {
    const currentCart = this.cartItemsSubject.getValue();
    const existingItem = currentCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      currentCart.push(product);
    }

    this.saveCartToLocalStorage(currentCart); 
    this.cartItemsSubject.next(currentCart);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentCart = this.cartItemsSubject.getValue();
    const item = currentCart.find((item) => item.id === itemId);

    if (item && quantity > 0) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.saveCartToLocalStorage(currentCart); 
      this.cartItemsSubject.next(currentCart);
    }
  }

  removeFromCart(itemId: number): void {
    const updatedCart = this.cartItemsSubject
      .getValue()
      .filter((item) => item.id !== itemId);

    this.saveCartToLocalStorage(updatedCart);
    this.cartItemsSubject.next(updatedCart);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((sum, item) => sum + item.total, 0);
  }
}
