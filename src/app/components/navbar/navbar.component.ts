// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   template: `
//     <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div class="container-fluid">
//         <!-- Logo Section -->
//         <a class="navbar-brand" href="/">Mania Store</a>

//         <!-- Toggler for mobile view -->
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>

//         <!-- Links Section -->
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav ms-auto">
//             <li class="nav-item">
//               <a class="nav-link active" aria-current="page" href="/">Home</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="/products">Products</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="/cart">Cart</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   `,
// })
// export class NavbarComponent {}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Adjust path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import necessary modules
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <!-- Logo Section -->
        <a class="navbar-brand" href="/">Mania Store</a>

        <!-- Toggler for mobile view -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links Section -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" routerLink="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/products">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cart">
                Cart
                <span class="badge bg-primary">
                  {{ cartItemCount }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {

      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }
}
