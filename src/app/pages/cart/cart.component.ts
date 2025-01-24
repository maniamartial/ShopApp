import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],  // Add FormsModule here
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <app-navbar></app-navbar>
      
      <!-- Cart Header -->
      <header class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800">Your Shopping Cart</h1>
        <p class="text-lg text-gray-600 mt-4">Review your items and proceed to checkout.</p>
      </header>

      <!-- Cart Items -->
      <section *ngIf="cartItems.length > 0; else noItems">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <table class="min-w-full table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-gray-700">Product</th>
                <th class="px-4 py-2 text-left text-gray-700">Price</th>
                <th class="px-4 py-2 text-left text-gray-700">Quantity</th>
                <th class="px-4 py-2 text-left text-gray-700">Total</th>
                <th class="px-4 py-2 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems">
                <td class="px-4 py-2">
                  <div class="flex items-center">
                    <img class="w-16 h-16 object-cover rounded-md" [src]="item.image" alt="Product" />
                    <span class="ml-4 text-gray-800">{{ item.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-2 text-gray-800">{{ item.price  }}</td>
                <td class="px-4 py-2">
                  <input
                    type="number"
                    [(ngModel)]="item.quantity"
                    (change)="updateCart()"
                    class="w-20 p-2 border rounded"
                    min="1"
                  />
                </td>
                <td class="px-4 py-2 text-gray-800">{{ item.total  }}</td>
                <td class="px-4 py-2">
                  <button
                    (click)="removeFromCart(item)"
                    class="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Cart Total -->
          <div class="mt-6 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">Total: {{ totalPrice  }}</h2>
            <button class="bg-blue-500 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>

      <!-- No Items Message -->
      <ng-template #noItems>
        <div class="text-center text-gray-600">
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

  // Calculate the total price of the items in the cart
  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  // Update the cart when quantity changes
  updateCart() {
    this.cartItems.forEach(item => {
      item.total = item.price * item.quantity;
    });
  }

  // Remove an item from the cart
  removeFromCart(itemToRemove: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
  }
}
