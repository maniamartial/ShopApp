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
  imports: [NavbarComponent, RouterModule, CommonModule, HttpClientModule,FormsModule],
  template: `
    <div class="min-vh-100 bg-light p-4">
      <app-navbar></app-navbar>
      
      <!-- Header Section -->

      <!-- Search Section -->
      <section class="mb-5 text-center">
        <input 
          type="text" 
          class="form-control w-50 mx-auto" 
          placeholder="Search for a product..." 
          [(ngModel)]="searchQuery" 
          (input)="filterProducts()"
        />
      </section>

      <!-- Categories Section -->
      <section class="mb-5">
        <h2 class="h2 fw-bold text-dark text-center mb-4">Shop by Category</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div *ngFor="let category of categories | slice:0:6" class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title text-dark">{{ category.name }}</h5>
                <button
                  class="btn btn-secondary w-100"
                  [routerLink]="['/category', category.id]"
                >
                  View Category
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-info" [routerLink]="'/categories'">View All Categories</button>
        </div>
      </section>

      <!-- Products Section -->
      <section class="mb-5">
        <h2 class="h2 fw-bold text-dark text-center mb-4">Featured Products</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div *ngFor="let product of filteredProducts" class="col">
            <div class="card h-100">
              <img class="card-img-top" [src]="product.images[0]" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title text-dark">{{ product.title }}</h5>
                <p class="card-text text-muted">{{ product.description }}</p>
                <button
                  class="btn btn-primary w-100"
                  [routerLink]="['/product', product.id]"
                >
                  View Product
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-info" [routerLink]="'/products'">View All Products</button>
        </div>
      </section>
    </div>
  `,
})
export class HomePageComponent implements OnInit {
  products: any[] = []; 
  categories: any[] = []; 
  filteredProducts: any[] = []; 
  searchQuery: string = ''; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); 
    this.loadCategories(); 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;  
        this.filteredProducts = response; 
      },
      (error) => {
        console.error('Error fetching products:', error); 
      }
    );
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (response) => {
        this.categories = response;  
      },
      (error) => {
        console.error('Error fetching categories:', error);  
      }
    );
  }

  filterProducts(): void {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
