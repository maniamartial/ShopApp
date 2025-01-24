import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NavbarComponent], // Import NavbarComponent here

  template: `
    <div class="min-h-screen bg-gray-100 p-6">
     <!-- Navbar -->
      <app-navbar></app-navbar> <!-- Use Navbar component here -->
      <div class="container mx-auto">
        <!-- Product Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-gray-800">Product Details</h1>
          <p class="text-lg text-gray-600">Explore the features and details of this amazing product.</p>
        </div>

        <!-- Product Card -->
        <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="flex-shrink-0">
            <img
              class="w-full md:w-96 h-72 object-cover"
              src="https://via.placeholder.com/500x500" alt="Product Image"
            />
          </div>
          <div class="p-6 flex flex-col justify-between">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Product Name</h2>
            <p class="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec eros vitae metus
              vehicula gravida.
            </p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-green-600">$99.99</span>
              <button
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductPageComponent {}
