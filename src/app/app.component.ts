import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomerComponent, AdminDashboardComponent],
  template: `
    <!-- 1. Giao diện trang dành cho ADMIN -->
    <app-admin-dashboard *ngIf="currentUser && currentUser.role === 'admin'"></app-admin-dashboard>

    <!-- 2. Giao diện trang dành cho NHÂN VIÊN -->
    <div *ngIf="currentUser && currentUser.role === 'staff'" class="dashboard-page">
      <h2>Trang Làm Việc Của Nhân Viên Bán Hàng</h2>
      <p>Xin chào nhân viên: <b>{{ currentUser.username }}</b></p>
      <button (click)="logout()" class="btn-logout">Đăng Xuất</button>
    </div>

    <!-- 3. Giao diện TRANG CHỦ MUA SẮM CỦA KHÁCH HÀNG (Mặc định hiển thị khi chưa đăng nhập hoặc đăng xuất) -->
    <app-customer *ngIf="!currentUser || currentUser.role === 'customer'"></app-customer>
  `,
  styles: [`
    .dashboard-page { padding: 40px; font-family: sans-serif; text-align: center; }
    .btn-logout {
      background: #ef4444; color: white; border: none;
      padding: 10px 20px; border-radius: 8px; cursor: pointer;
      font-weight: bold; margin-top: 15px;
    }
  `]
})
export class AppComponent implements OnInit {
  title = '24ct1-nguyen-thi-khanh-hang';
  currentUser: any = null;

  // Inject DatabaseService vào Constructor để GitDiagram quét được liên kết phụ thuộc
  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.checkUserSession();
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

  logout() {
    sessionStorage.removeItem('ody_current_user');
    localStorage.removeItem('ody_current_user');
    this.currentUser = null;
    window.location.reload();
  }
}