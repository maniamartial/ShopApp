import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service'; // Import CartService

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
    private cartService: CartService // Inject CartService
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
      total: product.price, // Initial total = price * 1
    };
    // alert(cartItem.total)
    this.cartService.addToCart(cartItem);
    // alert(`${product.title} has been added to your cart!`);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../services/product.service';
// import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor
// import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, NavbarComponent, HttpClientModule],  // Add dependencies here
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css'],
// })
// export class ProductDetailsComponent implements OnInit {
//   product: any | null = null; // Initialize the product object
//   errorMessage: string | null = null;
//   loading: boolean = false;  // Add loading property
//   mainImage: string | null = null; // To track the main image
//   cart: any[] = []; // Add a cart array to store products

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('productId');
//     if (productId) {
//       this.productService.getProductById(Number(productId)).subscribe(
//         (data) => {
//           this.product = data;
//           this.mainImage = data.images[0]; // Set the first image as the main image
//         },
//         (error) => {
//           this.errorMessage = error;
//           console.error('Error fetching product:', error);
//         }
//       );
//     }
//   }

//   changeMainImage(image: string): void {
//     this.mainImage = image;
//   }

//   addToCart(product: any): void {
//     this.cart.push(product); // Add the product to the cart array
//     console.log('Product added to cart:', product);
//     alert(`${product.title} added to cart!`);
//   }
// }