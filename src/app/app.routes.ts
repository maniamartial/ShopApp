// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product/product.component';
import { CategoryPageComponent } from './pages/categories/categories.component';  // Add this line
import {CartPageComponent} from './pages/cart/cart.component'
import {CheckoutPageComponent} from './pages/checkout/checkout.component'

// Define your routes here
export const appRoutes: Routes = [
    { path: '', component: HomePageComponent }, // Default route
    { path: 'product', component: ProductPageComponent }, // /product route
    { path: 'category/:categoryId', component: CategoryPageComponent }, // /category/:categoryId route
    { path: 'cart', component: CartPageComponent },  // Cart page route
    {path: 'checkout', component: CheckoutPageComponent}

  ];
  

// You can use RouterModule.forRoot in your Standalone Component
export const AppRoutingModule = RouterModule.forRoot(appRoutes);
