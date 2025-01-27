import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  template: `
    <div class="min-vh-100 bg-light p-4">
      <app-navbar></app-navbar>
      
      <header class="text-center mb-5">
        <h1 class="display-4 text-dark">Checkout</h1>
        <p class="lead text-muted">Complete your order by providing your details.</p>
      </header>

      <section>
        <div class="card shadow-lg rounded-3 p-4">
          <form (ngSubmit)="submitOrder()" #checkoutForm="ngForm">
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

    <div *ngIf="orderSubmitted" class="modal show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Order Success</h5>
            <button type="button" class="close" (click)="closeModal()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <h2>Your order has been placed and is being processed! 😊</h2>
            <p><span class="text-success">🌸</span> Thank you for shopping with us! 🌸</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutPageComponent {
  userDetails = {
    name: '',
    email: '',
    address: ''
  };

  cartItems = [];
  orderSubmitted = false;

  submitOrder() {
    if (this.userDetails.name && this.userDetails.email && this.userDetails.address) {
      console.log('Order submitted:', this.userDetails);
      console.log('Cart items:', this.cartItems);
      
      this.userDetails = { name: '', email: '', address: '' };
      this.cartItems = [];  
      this.orderSubmitted = true;  
    } else {
      alert('Please fill out all fields.');
    }
  }

  closeModal() {
    this.orderSubmitted = false; 
  }
}
