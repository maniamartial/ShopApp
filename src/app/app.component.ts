
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

// Import your components here
import { HomePageComponent } from './pages/home/home.component';
// import { ProductsComponent } from './pages/product/product.component';
import {CartPageComponent} from "./pages/cart/cart.component"
import {CheckoutPageComponent} from "./pages/checkout/checkout.component"
// import {ProductDetailsComponent} from "./pages/product-details/product-details.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomePageComponent, CartPageComponent, CheckoutPageComponent],  // Add routing and pages
  templateUrl: './app.component.html',
})
export class AppComponent {}
