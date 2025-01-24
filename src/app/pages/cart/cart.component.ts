import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  template: `
    <div class="min-vh-100 bg-light p-4">
      <!-- Navbar -->
      <app-navbar></app-navbar>
      
      <!-- Cart Header -->
      <header class="text-center mb-5">
        <h1 class="display-4 fw-bold text-dark">Your Shopping Cart</h1>
        <p class="lead text-muted">Review your items and proceed to checkout.</p>
      </header>

      <!-- Cart Items -->
      <section *ngIf="cartItems.length > 0; else noItems">
        <div class="bg-white shadow-sm rounded-3 p-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Total</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems">
                <td>
                  <div class="d-flex align-items-center">
                    <img class="img-fluid w-25 h-25 rounded" [src]="item.image" alt="Product" />
                    <span class="ms-3 text-dark">{{ item.name }}</span>
                  </div>
                </td>
                <td>{{ item.price | currency }}</td>
                <td>
                  <input
                    type="number"
                    [(ngModel)]="item.quantity"
                    (change)="updateCart()"
                    class="form-control w-25"
                    min="1"
                  />
                </td>
                <td>{{ item.total | currency }}</td>
                <td>
                  <button
                    (click)="removeFromCart(item)"
                    class="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Cart Total -->
          <div class="mt-4 d-flex justify-content-between align-items-center">
            <h2 class="h5 text-dark">Total: {{ totalPrice | currency }}</h2>
            <button class="btn btn-primary btn-lg">Proceed to Checkout</button>
          </div>
        </div>
      </section>

      <!-- No Items Message -->
      <ng-template #noItems>
        <div class="text-center text-muted">
          <p>Your cart is empty!</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class CartPageComponent {
  cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 1, image: 'https://via.placeholder.com/100', total: 100 },
    { id: 2, name: 'Product 2', price: 150, quantity: 2, image: 'https://via.placeholder.com/100', total: 300 },
  ];

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  updateCart() {
    this.cartItems.forEach(item => {
      item.total = item.price * item.quantity;
    });
  }

  removeFromCart(itemToRemove: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
  }
}
