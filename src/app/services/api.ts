import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  // Trỏ về port 3000 mà json-server đang chạy
  private baseUrl = 'http://localhost:3000'; 

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}``