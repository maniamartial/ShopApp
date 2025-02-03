import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchQuery = '';
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  featuredProducts: any[] = [];
  selectedCategoryName: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.loadFeaturedProducts();
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

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(products =>
       this.featuredProducts = products.slice(0, 6));
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

