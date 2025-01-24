import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],  // Add CommonModule here
  template: `
    <div class="min-vh-100 bg-light p-4">
      <app-navbar></app-navbar>
      
      <!-- Checkout Header -->
      <header class="text-center mb-5">
        <h1 class="display-4 text-dark">Checkout</h1>
        <p class="lead text-muted">Complete your order by providing your details.</p>
      </header>

      <!-- Checkout Form -->
      <section>
        <div class="card shadow-lg rounded-3 p-4">
          <form (ngSubmit)="submitOrder()" #checkoutForm="ngForm">
            <!-- User Details -->
            <div class="mb-3">
              <label for="name" class="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="userDetails.name"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="userDetails.email"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                [(ngModel)]="userDetails.address"
                class="form-control"
                rows="4"
                required
              ></textarea>
            </div>

            <!-- Order Summary -->
            <div class="mt-4">
              <h3 class="h5 text-dark mb-3">Order Summary</h3>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-start">Product</th>
                    <th class="text-start">Price</th>
                    <th class="text-start">Quantity</th>
                    <th class="text-start">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of cartItems">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price | currency }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.total | currency }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <h2 class="h4 text-dark">Total: {{ totalPrice | currency }}</h2>
              </div>
            </div>

            <!-- Checkout Button -->
            <div class="mt-4">
              <button
                type="submit"
                [disabled]="!checkoutForm.valid"
                class="btn btn-success w-100"
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

  //Will replace with data from the cart : TODO
  cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 1, total: 100 },
    { id: 2, name: 'Product 2', price: 150, quantity: 2, total: 300 },
  ];

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

=  submitOrder() {
    if (this.userDetails.name && this.userDetails.email && this.userDetails.address) {
      console.log('Order submitted:', this.userDetails);
      console.log('Cart items:', this.cartItems);
      this.userDetails = { name: '', email: '', address: '' };
      alert('Order submitted successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  }
}
