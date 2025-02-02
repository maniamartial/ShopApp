import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//TODO: complement on authorization, learning to implement guards
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(token: string): void {
    localStorage.setItem('token', token); 
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

