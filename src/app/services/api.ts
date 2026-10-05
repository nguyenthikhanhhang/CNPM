import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  // URL gốc của backend API (Thay thế bằng URL thực tế của server bạn)
  private baseUrl = 'https://api.example.com/api';

  // 1. Lấy danh sách sản phẩm (Dùng cho POS / Products)
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // 2. Lấy danh sách đơn hàng (Dùng cho Orders)
  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  // 3. Lấy danh sách khách hàng (Dùng cho Customers)
  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers`);
  }

  // 4. Tạo đơn hàng mới từ trang POS
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, orderData);
  }
}