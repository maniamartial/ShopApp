import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="bg-gray-800 text-white p-4 shadow-md">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logo Section -->
        <div>
          <a href="/" class="text-3xl font-bold text-white">Mania Store</a>
        </div>

        <!-- Links Section -->
        <div class="space-x-6">
          <a href="/" class="text-lg hover:text-gray-400">Home</a>
          <a href="/product" class="text-lg hover:text-gray-400">Products</a>
          <a href="/cart" class="text-lg hover:text-gray-400">Cart</a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {}
