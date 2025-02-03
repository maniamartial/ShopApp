import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl:'./checkout.component.html',

})
export class CheckoutPageComponent {
  userDetails = {
    name: '',
    email: '',
    address: ''
  };

  cartItems = [];
  orderSubmitted = false;

  submitOrder() {
    if (this.userDetails.name && this.userDetails.email && this.userDetails.address) {
      console.log('Order submitted:', this.userDetails);
      console.log('Cart items:', this.cartItems);
      
      this.userDetails = { name: '', email: '', address: '' };
      this.cartItems = [];  
      this.orderSubmitted = true;  
    } else {
      alert('Please fill out all fields.');
    }
  }

  closeModal() {
    this.orderSubmitted = false; 
  }
}
