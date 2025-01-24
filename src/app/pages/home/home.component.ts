// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule],  // Add CommonModule to imports
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <app-navbar></app-navbar>
      
      <!-- Header Section -->
      <header class="text-center mb-10">
        <h1 class="text-5xl font-extrabold text-gray-800">Welcome to Our Store!</h1>
        <p class="text-lg text-gray-600 mt-4">Explore the best products in our online store.</p>
      </header>

      <!-- Categories Section -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">Shop by Categories</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div *ngFor="let category of categories" class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <img class="w-full h-40 object-cover mb-4" [src]="category.image" alt="Category Image" />
            <h3 class="text-lg font-semibold text-gray-800">{{ category.name }}</h3>
            <button
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              [routerLink]="['/category', category.id]"
            >
              View Products
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomePageComponent {
  categories = [
    { id: '1', name: 'Category 1', image: 'https://via.placeholder.com/200x200' },
    { id: '2', name: 'Category 2', image: 'https://via.placeholder.com/200x200' },
    { id: '3', name: 'Category 3', image: 'https://via.placeholder.com/200x200' },
    { id: '4', name: 'Category 4', image: 'https://via.placeholder.com/200x200' },
  ];
}
