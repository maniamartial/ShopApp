import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  images: string[];
}

@Injectable({
  providedIn: 'root',  
})
export class ProductService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1';  

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError)  
    );
  }

 
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)  
    );
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`).pipe(
      catchError(this.handleError) 
    );
  }


   getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }
  
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `API returned code ${error.status}, message: ${error.message}`;
    }
    
    return throwError(errorMessage);
  }
}
