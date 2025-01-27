import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  mainImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        (data) => {
          this.product = data;
          this.mainImage = data.images[0];
        },
        (error) => {
          this.errorMessage = error;
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  addToCart(product: any): void {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      total: product.price, 
    };

    this.cartService.addToCart(cartItem);
  }
}
