import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="min-vh-100 bg-light">
      <app-navbar></app-navbar>
      <section class="py-4 text-center bg-white shadow-sm mb-4">
        <h4 class="text-dark fw-bold mb-2">Hi Kyosk!</h4>
        <div class="input-group w-50 mx-auto">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search for products..." 
            [(ngModel)]="searchQuery" 
            (input)="filterProducts()"
          />
          <button class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </section>
      <section class="mb-5">
  <h2 class="h2 fw-bold text-dark text-center mb-4">Shop by Category</h2>
  <div class="d-flex overflow-auto gap-3 px-3">
    <button
      *ngFor="let category of categories"
      class="btn btn-outline-secondary flex-shrink-0"
      (click)="filterByCategory(category.id)"
    >
      {{ category.name }}
    </button>
  </div>
</section>

      <section class="mb-4">
        <div class="container">
          <h5 class="text-dark fw-bold mb-3">
            {{ selectedCategoryName || 'All Products' }}
          </h5>
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            <div *ngFor="let product of filteredProducts" class="col">
              <div class="card h-100">
                <img [src]="product.images[0]" class="card-img-top" alt="Product Image">
                <div class="card-body">
                  <h6 class="card-title text-dark">{{ product.title }}</h6>
                  <p class="text-success fw-bold">{{ product.price | currency:'KES' }}</p>
                  <button class="btn btn-primary w-100" [routerLink]="['/product', product.id]">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomePageComponent implements OnInit {
  searchQuery = '';
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategoryName: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterByCategory(categoryId: number): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    this.selectedCategoryName = category?.name || null;
    this.filteredProducts = categoryId
      ? this.products.filter(product => product.category.id === categoryId)
      : [...this.products];
  }
}




// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { CartService } from '../../services/cart.service';  // Import CartService


// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [NavbarComponent, RouterModule, CommonModule, HttpClientModule, FormsModule],
//   templateUrl: './home.component',

// })
// export class HomePageComponent implements OnInit {
//   searchQuery: string = '';
//   categories: any[] = [];
//   products: any[] = [];
//   filteredProducts: any[] = [];
//   selectedCategoryId: string | null = null;
//   selectedCategoryName: string | null = null;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService  // Inject CartService
//   ) {}

//   ngOnInit(): void {
//     this.loadCategories();
//     this.loadProducts();
//   }

//   loadCategories(): void {
//     this.productService.getCategories().subscribe((categories) => {
//       this.categories = categories;
//     });
//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe((products) => {
//       this.products = products;
//       this.filteredProducts = products;
//     });
//   }

//   filterProducts(): void {
//     this.filteredProducts = this.products.filter((product) =>
//       product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   filterByCategory(categoryId: number): void {
//     const category = this.categories.find((cat) => cat.id === categoryId);
//     this.selectedCategoryName = category ? category.name : null;

//     if (categoryId) {
//       this.filteredProducts = this.products.filter(
//         (product) => product.category.id === categoryId
//       );
//     } else {
//       this.filteredProducts = [...this.products];
//     }
//   }

//   addToCart(product: any): void {
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: 1,
//       image: product.images[0],
//       total: product.price,  // Initialize total as price * quantity
//     };

//     this.cartService.addToCart(cartItem);
//   }
// }

// // export class HomePageComponent implements OnInit {
// //   searchQuery: string = '';
// //   categories: any[] = [];
// //   products: any[] = [];
// //   filteredProducts: any[] = [];
// //   selectedCategoryId: string | null = null;
// //   selectedCategoryName: string | null = null;

// //   constructor(private productService: ProductService) {}

// //   ngOnInit(): void {
// //     this.loadCategories();
// //     this.loadProducts();
// //   }

// //   loadCategories(): void {
// //     console.log("Okay",this.productService.getCategories())
// //     this.productService.getCategories().subscribe((categories) => 
// //       {
// //         (this.categories = categories)});
// //   }

// //   loadProducts(): void {
// //     this.productService.getProducts().subscribe((products) => {
// //       this.products = products;
// //       this.filteredProducts = products;
// //     });
// //   }

// //   filterProducts(): void {
// //     this.filteredProducts = this.products.filter((product) =>
// //       product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
// //     );
// //   }

// //   filterByCategory(categoryId: number): void {
// //     const category = this.categories.find((cat) => cat.id === categoryId);
// //       this.selectedCategoryName = category ? category.name : null;
// //     if (categoryId) {
// //       this.filteredProducts = this.products.filter(
// //         (product) => product.category.id === categoryId
// //       );
// //     } else {
// //       this.filteredProducts = [...this.products];
// //     }
// //   }
  
// // }
