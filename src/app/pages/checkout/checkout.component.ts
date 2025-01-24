import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],  // Add CommonModule here
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <app-navbar></app-navbar>
      
      <!-- Checkout Header -->
      <header class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800">Checkout</h1>
        <p class="text-lg text-gray-600 mt-4">Complete your order by providing your details.</p>
      </header>

      <!-- Checkout Form -->
      <section>
        <div class="bg-white shadow-lg rounded-lg p-6">
          <form (ngSubmit)="submitOrder()" #checkoutForm="ngForm">
            <!-- User Details -->
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="userDetails.name"
                class="w-full p-2 border rounded"
                required
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="userDetails.email"
                class="w-full p-2 border rounded"
                required
              />
            </div>

            <div class="mb-4">
              <label for="address" class="block text-gray-700 font-semibold">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                [(ngModel)]="userDetails.address"
                class="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <!-- Order Summary -->
            <div class="mt-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <table class="min-w-full table-auto">
                <thead>
                  <tr>
                    <th class="px-4 py-2 text-left text-gray-700">Product</th>
                    <th class="px-4 py-2 text-left text-gray-700">Price</th>
                    <th class="px-4 py-2 text-left text-gray-700">Quantity</th>
                    <th class="px-4 py-2 text-left text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of cartItems">
                    <td class="px-4 py-2 text-gray-800">{{ item.name }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ item.price }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ item.quantity }}</td>
                    <td class="px-4 py-2 text-gray-800">{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-4 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Total: {{ totalPrice }}</h2>
              </div>
            </div>

            <!-- Checkout Button -->
            <div class="mt-6">
              <button
                type="submit"
                [disabled]="!checkoutForm.valid"
                class="bg-green-500 text-white px-6 py-2 rounded"
              >
                Complete Checkout
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `,
})
export class CheckoutPageComponent {
  userDetails = {
    name: '',
    email: '',
    address: ''
  };

  cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 1, total: 100 },
    { id: 2, name: 'Product 2', price: 150, quantity: 2, total: 300 },
  ];

  // Calculate the total price of the items in the cart
  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  // Submit the order
  submitOrder() {
    if (this.userDetails.name && this.userDetails.email && this.userDetails.address) {
      // Here you would typically send the order details to your backend or API
      console.log('Order submitted:', this.userDetails);
      console.log('Cart items:', this.cartItems);
      // Optionally, reset the form after submission
      this.userDetails = { name: '', email: '', address: '' };
      alert('Order submitted successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  }
}
