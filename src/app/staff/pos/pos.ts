import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>🛒 Màn Hình Bán Hàng Trực Tiếp (POS)</h3>
      
      @if (isLoading) {
        <p>⏳ Đang tải dữ liệu sản phẩm...</p>
      } @else {
        <div style="display: flex; gap: 20px; margin-top: 15px;">
          <!-- Danh sách sản phẩm -->
          <div style="flex: 2; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            @for (item of products; track item.id) {
              <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h4 style="margin: 0 0 10px 0;">{{ item.name }}</h4>
                <p style="color: #e63946; font-weight: bold; font-size: 16px;">{{ item.price | currency:'VND' }}</p>
                <button (click)="addToCart(item)" style="background: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%;">
                  ➕ Thêm vào giỏ
                </button>
              </div>
            }
          </div>

          <!-- Giỏ hàng / Thanh toán tại quầy -->
          <div style="flex: 1; border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: #f8f9fa; height: fit-content;">
            <h4>📦 Giỏ Hàng Tại Quầy</h4>
            @if (cart.length === 0) {
              <p style="color: #666; font-style: italic;">Chưa có sản phẩm nào trong giỏ.</p>
            } @else {
              <ul style="list-style: none; padding: 0; margin: 0 0 15px 0;">
                @for (c of cart; track c.id) {
                  <li style="display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #ddd; padding-bottom: 5px;">
                    <span>{{ c.name }} (x{{ c.quantity }})</span>
                    <span>{{ c.price * c.quantity | currency:'VND' }}</span>
                  </li>
                }
              </ul>
              <hr />
              <p style="font-weight: bold; font-size: 18px;">Tổng tiền: <span style="color: #e63946;">{{ getTotal() | currency:'VND' }}</span></p>
              <button (click)="checkout()" style="background: #28a745; color: white; border: none; padding: 10px; width: 100%; border-radius: 5px; font-weight: bold; cursor: pointer;">
                💳 Thanh Toán Đơn Hàng
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class PosComponent implements OnInit {
  private apiService = inject(ApiService);

  products: any[] = [];
  cart: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = (data && data.length > 0) ? data : this.getDummyProducts();
        this.isLoading = false;
      },
      error: () => {
        this.products = this.getDummyProducts();
        this.isLoading = false;
      }
    });
  }

  getDummyProducts() {
    return [
      { id: 1, name: 'Áo thun Odyssey', price: 150000 },
      { id: 2, name: 'Quần Jean Nam', price: 350000 },
      { id: 3, name: 'Giày Sneaker Thời Trang', price: 650000 },
      { id: 4, name: 'Mũ lưỡi trai Odyssey', price: 90000 }
    ];
  }

  addToCart(product: any) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  checkout() {
    if (this.cart.length === 0) return;
    alert(`Thanh toán thành công tổng số tiền: ${this.getTotal().toLocaleString()} VND!`);
    this.cart = [];
  }
}