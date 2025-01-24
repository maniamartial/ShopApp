import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],  // Add dependencies here
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any | null = null; // Initialize the product object
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
