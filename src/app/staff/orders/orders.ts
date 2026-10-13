import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>📦 Danh Sách & Duyệt Đơn Hàng Khách Hàng</h3>
      
      @if (isLoading) {
        <p>⏳ Đang tải đơn hàng...</p>
      } @else if (orders.length === 0) {
        <p style="color: #666; font-style: italic; margin-top: 15px;">Chưa có đơn hàng nào từ khách hàng.</p>
      } @else {
        <table border="1" cellpadding="12" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff;">
          <thead>
            <tr style="background: #f2f2f2; text-align: left;">
              <th>Mã Đơn</th>
              <th>Khách Hàng</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Hành Động Duyệt</th>
            </tr>
          </thead>
          <tbody>
            @for (order of orders; track order.id) {
              <tr>
                <td>#{{ order.id }}</td>
                <td>{{ order.customerName || 'Khách hàng' }}</td>
                <td>{{ order.totalPrice | currency:'VND' }}</td>
                <td>
                  <span [style.color]="order.status === 'PENDING' ? 'orange' : 'green'" style="font-weight: bold;">
                    {{ order.status === 'PENDING' ? 'Chờ duyệt (PENDING)' : 'Đã duyệt / Giao hàng (SHIPPING)' }}
                  </span>
                </td>
                <td>
                  @if (order.status === 'PENDING') {
                    <button (click)="approveOrder(order.id)" style="background: #28a745; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px; font-weight: bold;">
                      ✔️ Duyệt Đơn
                    </button>
                  } @else {
                    <span style="color: gray; font-weight: bold;">Đã hoàn tất</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `
})
export class Orders implements OnInit {
  orders: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // Đọc danh sách đơn hàng từ localStorage của trình duyệt
    const savedOrders = localStorage.getItem('ody_orders');
    if (savedOrders) {
      try {
        this.orders = JSON.parse(savedOrders);
      } catch (e) {
        console.error('Lỗi đọc đơn hàng:', e);
        this.orders = [];
      }
    } else {
      this.orders = []; // Trả về mảng trống nếu chưa có ai mua hàng
    }
    this.isLoading = false;
  }

  approveOrder(id: number) {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = 'SHIPPING'; // Chuyển trạng thái sang đang giao
      // Lưu lại thay đổi vào localStorage
      localStorage.setItem('ody_orders', JSON.stringify(this.orders));
      alert(`Đã duyệt thành công đơn hàng #${id}!`);
    }
  }
}