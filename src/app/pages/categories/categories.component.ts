// src/app/pages/category/category.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent], 
  
  // Add CommonModule to imports
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <app-navbar></app-navbar>
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Category: {{ categoryId }}</h1>
        <p class="text-lg text-gray-600">Explore products in this category.</p>
      </div>

      <div *ngIf="categoryId">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Products</h2>
        
        <!-- Product List -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          <div *ngFor="let product of products" class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <img class="w-full h-48 object-cover mb-4" [src]="product.image" alt="Product Image" />
            <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-gray-600">{{ product.price }}</p> <!-- Currency pipe should now work -->
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CategoryPageComponent implements OnInit {
  categoryId: string | null = '';
  products = [
    { name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/300x300' },
    { name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/300x300' },
    { name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/300x300' },
    { name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/300x300' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    
    // You can fetch products based on categoryId from an API or a service here
  }
}
