import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component'; 
import {CartPageComponent} from './pages/cart/cart.component'
import {CheckoutPageComponent} from './pages/checkout/checkout.component'
import {CategoryPageComponent} from "./pages/category/category.component"
import { ProductsComponent } from './pages/products/products.component'; 

export const appRoutes: Routes = [
    { path: '', component: HomePageComponent }, 
    { path: 'product/:productId', component: ProductDetailsComponent },
    { path: 'category/:categoryId', component: CategoryPageComponent }, 
    { path: 'cart', component: CartPageComponent }, 
    {path: 'checkout', component: CheckoutPageComponent},
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent }, 

  ];
  

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
