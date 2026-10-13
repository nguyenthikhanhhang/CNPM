import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerComponent, AdminDashboardComponent],
  template: `
    <!-- 1. Giao diện trang dành cho ADMIN -->
    <app-admin-dashboard *ngIf="currentUser && currentUser.role && currentUser.role.toLowerCase() === 'admin'"></app-admin-dashboard>

    <!-- 2. Giao diện trang dành cho NHÂN VIÊN BÁN HÀNG -->
    <div *ngIf="currentUser && (!currentUser.role || currentUser.role.toLowerCase() === 'staff' || currentUser.role.toLowerCase() === 'nhan-vien')" class="staff-container">
      
      <!-- Header Trang Nhân Viên -->
      <header class="staff-header">
        <div class="staff-title">
          <h2>Trang Làm Việc Của Nhân Viên Bán Hàng</h2>
          <p>Xin chào nhân viên: <b>{{ currentUser.username }}</b></p>
        </div>
        <button (click)="logout()" class="btn-logout">Đăng Xuất</button>
      </header>

      <!-- Thanh chuyển đổi tính năng (Tabs) -->
      <nav class="staff-tabs">
        <button [class.active]="activeTab === 'orders'" (click)="activeTab = 'orders'">
          📦 Quản Lý & Duyệt Đơn Hàng
        </button>
        <button [class.active]="activeTab === 'products'" (click)="activeTab = 'products'">
          ➕ Thêm Sản Phẩm Mới
        </button>
      </nav>

      <!-- Khu vực nội dung chính -->
      <main class="staff-content">
        
        <!-- TAB 1: XEM VÀ DUYỆT ĐƠN HÀNG -->
        <div *ngIf="activeTab === 'orders'" class="tab-panel">
          <h3>Danh Sách Đơn Hàng Của Khách Hàng</h3>
          
          <div *ngIf="orders.length === 0" class="empty-msg">
            Chưa có đơn hàng nào trong hệ thống.
          </div>

          <div class="order-list" *ngIf="orders.length > 0">
            <div *ngFor="let order of orders; let i = index" class="order-card">
              <div class="order-info">
                <strong>Mã đơn: #{{ order.id || i + 1 }}</strong>
                <span>Khách hàng: {{ order.customerName || order.username || 'Khách vãng lai' }}</span>
                <span>Tổng tiền: <b>{{ order.total || order.amount || 0 }} đ</b></span>
                <span class="status-badge" [ngClass]="{'pending': order.status === 'Chờ duyệt' || !order.status, 'approved': order.status === 'Đã duyệt', 'cancelled': order.status === 'Đã hủy'}">
                  {{ order.status || 'Chờ duyệt' }}
                </span>
              </div>
              <div class="order-actions" *ngIf="!order.status || order.status === 'Chờ duyệt'">
                <button (click)="approveOrder(i)" class="btn-approve">Duyệt Đơn</button>
                <button (click)="cancelOrder(i)" class="btn-cancel">Hủy</button>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: THÊM SẢN PHẨM -->
        <div *ngIf="activeTab === 'products'" class="tab-panel">
          <h3>Thêm Sản Phẩm Mới Vào Cửa Hàng</h3>
          
          <form (submit)="addNewProduct($event)" class="product-form">
            <div class="form-group">
              <label>Tên sản phẩm</label>
              <input type="text" [(ngModel)]="newProduct.name" name="name" placeholder="Nhập tên sản phẩm..." required>
            </div>

            <div class="form-group">
              <label>Giá sản phẩm (VNĐ)</label>
              <input type="number" [(ngModel)]="newProduct.price" name="price" placeholder="Nhập giá sản phẩm..." required>
            </div>

            <div class="form-group">
              <label>Link hình ảnh</label>
              <input type="text" [(ngModel)]="newProduct.image" name="image" placeholder="Dán link ảnh sản phẩm...">
            </div>

            <div class="form-group">
              <label>Mô tả sản phẩm</label>
              <textarea [(ngModel)]="newProduct.description" name="description" placeholder="Mô tả chi tiết sản phẩm..."></textarea>
            </div>

            <button type="submit" class="btn-submit-product">Lưu & Thêm Sản Phẩm</button>
          </form>
        </div>

      </main>
    </div>

    <!-- 3. Giao diện TRANG CHỦ MUA SẮM CỦA KHÁCH HÀNG -->
    <app-customer *ngIf="!currentUser || (currentUser.role && currentUser.role.toLowerCase() === 'customer')"></app-customer>
  `,
  styles: [`
    .staff-container { max-width: 900px; margin: 30px auto; padding: 25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .staff-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px; }
    .staff-title h2 { margin: 0; color: #1e293b; font-size: 22px; }
    .staff-title p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; }
    .btn-logout { background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s; }
    .btn-logout:hover { background: #dc2626; }
    
    .staff-tabs { display: flex; gap: 12px; margin-bottom: 25px; }
    .staff-tabs button { background: #f1f5f9; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; color: #475569; transition: all 0.2s; }
    .staff-tabs button.active { background: #3b82f6; color: white; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); }

    .tab-panel { background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .tab-panel h3 { margin-top: 0; color: #334155; font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
    
    .empty-msg { color: #94a3b8; font-style: italic; text-align: center; padding: 30px; font-size: 15px; }

    .order-list { display: flex; flex-direction: column; gap: 12px; }
    .order-card { display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid #cbd5e1; padding: 16px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
    .order-info { display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: #334155; }
    .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; width: fit-content; margin-top: 4px; }
    .status-badge.pending { background: #fef3c7; color: #d97706; }
    .status-badge.approved { background: #dcfce7; color: #16a34a; }
    .status-badge.cancelled { background: #fee2e2; color: #dc2626; }

    .order-actions { display: flex; gap: 8px; }
    .btn-approve { background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-approve:hover { background: #059669; }
    .btn-cancel { background: #94a3b8; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-cancel:hover { background: #64748b; }

    .product-form { display: flex; flex-direction: column; gap: 16px; max-width: 500px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; text-align: left; }
    .form-group label { font-size: 13px; font-weight: bold; color: #475569; }
    .form-group input, .form-group textarea { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; background: white; }
    .form-group input:focus, .form-group textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); }
    .form-group textarea { resize: vertical; min-height: 90px; }
    .btn-submit-product { background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
    .btn-submit-product:hover { background: #2563eb; }
  `]
})
export class AppComponent implements OnInit {
  title = '24ct1-nguyen-thi-khanh-hang';
  currentUser: any = null;
  activeTab: string = 'orders';
  
  orders: any[] = [];
  newProduct = { name: '', price: null, image: '', description: '' };
  
  private router = inject(Router);

  ngOnInit() {
    this.initDefaultAdmin();
    this.checkUserSession();
    this.loadOrders();
  }

  initDefaultAdmin() {
    const existingUsers = localStorage.getItem('ody_users');
    if (!existingUsers) {
      const defaultUsers = [
        { username: 'odyddey', password: '123456', role: 'admin' }
      ];
      localStorage.setItem('ody_users', JSON.stringify(defaultUsers));
    }
  }

  checkUserSession() {
    const savedUser = sessionStorage.getItem('ody_current_user') || localStorage.getItem('ody_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.username) {
          this.currentUser = parsed;
          return;
        }
      } catch (e) {
        console.error('Lỗi đọc dữ liệu người dùng:', e);
      }
    }
    this.currentUser = null;
  }

  // Tải danh sách đơn hàng từ localStorage
  loadOrders() {
    const rawOrders = localStorage.getItem('ody_orders') || localStorage.getItem('orders');
    if (rawOrders) {
      try {
        this.orders = JSON.parse(rawOrders);
      } catch (e) {
        this.orders = [];
      }
    } else {
      // Dữ liệu mẫu ban đầu để nhân viên dễ thao tác test
      this.orders = [
        { id: 101, customerName: 'Khách hàng Nguyễn Văn A', total: 350000, status: 'Chờ duyệt' },
        { id: 102, customerName: 'Khách hàng Trần Thị B', total: 620000, status: 'Chờ duyệt' }
      ];
      localStorage.setItem('ody_orders', JSON.stringify(this.orders));
    }
  }

  // Duyệt đơn hàng
  approveOrder(index: number) {
    this.orders[index].status = 'Đã duyệt';
    localStorage.setItem('ody_orders', JSON.stringify(this.orders));
    alert(`Đã duyệt thành công đơn hàng #${this.orders[index].id || index + 1}!`);
  }

  // Hủy đơn hàng
  cancelOrder(index: number) {
    this.orders[index].status = 'Đã hủy';
    localStorage.setItem('ody_orders', JSON.stringify(this.orders));
    alert(`Đã hủy đơn hàng #${this.orders[index].id || index + 1}!`);
  }

  // Thêm sản phẩm mới vào hệ thống
  addNewProduct(event: Event) {
    event.preventDefault();
    if (!this.newProduct.name || !this.newProduct.price) {
      alert('Vui lòng điền đầy đủ tên và giá sản phẩm!');
      return;
    }

    const rawProducts = localStorage.getItem('ody_products') || localStorage.getItem('products');
    let productsList: any[] = [];
    try {
      productsList = rawProducts ? JSON.parse(rawProducts) : [];
    } catch (e) {
      productsList = [];
    }

    const productToAdd = {
      id: Date.now(),
      name: this.newProduct.name,
      price: Number(this.newProduct.price),
      image: this.newProduct.image || 'https://via.placeholder.com/150',
      description: this.newProduct.description
    };

    productsList.push(productToAdd);
    localStorage.setItem('ody_products', JSON.stringify(productsList));
    
    alert('Thêm sản phẩm mới thành công!');
    this.newProduct = { name: '', price: null, image: '', description: '' };
  }

  logout() {
    sessionStorage.removeItem('ody_current_user');
    localStorage.removeItem('ody_current_user');
    this.currentUser = null;
    window.location.reload();
  }
}