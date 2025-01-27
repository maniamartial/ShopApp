import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent], // Add CommonModule here
  template: `
    <div class="min-vh-100 bg-light p-4">
      <app-navbar></app-navbar>

      <header class="text-center mb-5">
        <h1 class="display-4 fw-bold text-dark">Your Shopping Cart</h1>
        <p class="lead text-muted">Review your items and proceed to checkout.</p>
      </header>

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
                  <img class="img-fluid" [src]="item.image" alt="Product" style="max-width: 50px; max-height: 50px;" />
                  <span class="ms-3 text-dark">{{ item.name }}</span>
                  </div>
                </td>
                <td>{{ item.price }}</td>
                <td>
                  <input
                    type="number"
                    [(ngModel)]="item.quantity"
                    (change)="updateQuantity(item.id, item.quantity)"
                    class="form-control w-25"
                    min="1"
                  />
                </td>
                <td>{{ item.total }}</td>
                <td>
                  <button
                    (click)="removeFromCart(item.id)"
                    class="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-4 d-flex justify-content-between align-items-center">
            <h2 class="h5 text-dark">Total: {{ totalPrice }}</h2>
            <button class="btn btn-primary btn-lg">Proceed to Checkout</button>
          </div>
        </div>
      </section>

      <ng-template #noItems>
        <div class="text-center text-muted">
          <p>Your cart is empty!</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class CartPageComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      console.log("Uko na ufala", items)
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }
}
