
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HomePageComponent } from './pages/home/home.component';
import {CartPageComponent} from "./pages/cart/cart.component"
import {CheckoutPageComponent} from "./pages/checkout/checkout.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomePageComponent, CartPageComponent, CheckoutPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
