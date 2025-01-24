import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule], 
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product/', productId]);
  }
}
