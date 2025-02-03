
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {

      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }
}

