import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <!-- Sidebar / Header -->
      <div class="admin-header">
        <div class="admin-title">
          <h2>⚙️ Cổng Quản Trị Hệ Thống ODYDDEY</h2>
          <p>Xin chào quản trị viên: <b>odyddey</b></p>
        </div>
        <button (click)="logout()" class="btn-logout">Đăng Xuất</button>
      </div>

      <!-- Thống kê nhanh / Báo cáo doanh số -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <span class="label">Tổng Doanh Số</span>
            <h3>12.850.000 đ</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <span class="label">Tổng Đơn Hàng</span>
            <h3>24 Đơn</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <span class="label">Nhân Viên Hệ Thống</span>
            <h3>{{ staffCount }} Tài Khoản</h3>
          </div>
        </div>
      </div>

      <!-- Khu vực chức năng chính -->
      <div class="admin-grid">
        <!-- Cấp tài khoản nhân viên -->
        <div class="admin-card">
          <h3>👨‍💼 Cấp Tài Khoản Nhân Viên Mới</h3>
          <p class="desc">Tạo tài khoản đăng nhập cho nhân viên bán hàng mới.</p>
          
          <div class="form-group">
            <label>Tên đăng nhập nhân viên</label>
            <input type="text" [(ngModel)]="newStaffUser" placeholder="Nhập username nhân viên...">
          </div>

          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" [(ngModel)]="newStaffPass" placeholder="••••••••">
          </div>

          <button (click)="createStaffAccount()" class="btn-primary">Cấp Tài Khoản Nhân Viên</button>
        </div>

        <!-- Báo cáo doanh số chi tiết -->
        <div class="admin-card">
          <h3>📊 Báo Cáo Doanh Số & Cửa Hàng</h3>
          <p class="desc">Thống kê hoạt động kinh doanh gần đây.</p>
          
          <div class="report-list">
            <div class="report-item">
              <span>Hôm nay</span>
              <span class="price">1.450.000 đ (3 đơn)</span>
            </div>
            <div class="report-item">
              <span>Tuần này</span>
              <span class="price">6.200.000 đ (12 đơn)</span>
            </div>
            <div class="report-item">
              <span>Tháng này (Tháng 9/2026)</span>
              <span class="price">12.850.000 đ (24 đơn)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 32px; background: #f8fafc; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .admin-header {
      display: flex; justify-content: space-between; align-items: center;
      background: white; padding: 20px 32px; border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 24px;
    }
    .admin-title h2 { margin: 0 0 4px 0; color: #0f172a; font-size: 22px; }
    .admin-title p { margin: 0; color: #64748b; font-size: 14px; }
    .btn-logout {
      background: #ef4444; color: white; border: none; padding: 10px 20px;
      border-radius: 10px; font-weight: 700; cursor: pointer; transition: background 0.2s;
    }
    .btn-logout:hover { background: #dc2626; }

    .stats-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 24px;
    }
    .stat-card {
      background: white; padding: 20px; border-radius: 16px; display: flex; align-items: center; gap: 16px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;
    }
    .stat-icon { font-size: 32px; background: #e0e7ff; padding: 12px; border-radius: 12px; }
    .stat-info .label { font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .stat-info h3 { margin: 4px 0 0 0; font-size: 20px; color: #0f172a; }

    .admin-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
    }
    @media (max-width: 768px) { .admin-grid { grid-template-columns: 1fr; } }

    .admin-card {
      background: white; padding: 28px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;
    }
    .admin-card h3 { margin-top: 0; color: #1e293b; font-size: 18px; }
    .admin-card .desc { color: #64748b; font-size: 13px; margin-bottom: 20px; }

    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 6px; }
    .form-group input {
      width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px;
      font-size: 14px; box-sizing: border-box; outline: none; transition: border-color 0.2s;
    }
    .form-group input:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }

    .btn-primary {
      width: 100%; background: #4f46e5; color: white; border: none; padding: 12px;
      border-radius: 10px; font-weight: 700; cursor: pointer; transition: background 0.2s;
    }
    .btn-primary:hover { background: #4338ca; }

    .report-list { display: flex; flex-direction: column; gap: 12px; }
    .report-item {
      display: flex; justify-content: space-between; padding: 14px 16px; background: #f8fafc;
      border-radius: 10px; font-size: 14px; color: #334155; font-weight: 600; border: 1px solid #e2e8f0;
    }
    .report-item .price { color: #4f46e5; font-weight: 700; }
  `]
})
export class AdminDashboardComponent {
  newStaffUser: string = '';
  newStaffPass: string = '';
  staffCount: number = 1;

  ngOnInit() {
    this.updateStaffCount();
  }

  updateStaffCount() {
    const registeredUsers = JSON.parse(localStorage.getItem('ody_users') || '{}');
    let count = 0;
    for (let key in registeredUsers) {
      if (registeredUsers[key].role === 'staff') {
        count++;
      }
    }
    this.staffCount = count > 0 ? count : 1;
  }

  createStaffAccount() {
    const userKey = this.newStaffUser.trim().toLowerCase();
    const pass = this.newStaffPass.trim();

    if (!userKey || !pass) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu nhân viên!');
      return;
    }

    let registeredUsers = JSON.parse(localStorage.getItem('ody_users') || '{}');

    if (registeredUsers[userKey]) {
      alert('Tài khoản này đã tồn tại trong hệ thống!');
      return;
    }

    // Lưu tài khoản nhân viên vào localStorage
    registeredUsers[userKey] = {
      password: pass,
      role: 'staff',
      roleName: 'Nhân Viên Bán Hàng'
    };

    localStorage.setItem('ody_users', JSON.stringify(registeredUsers));
    alert(`Đã cấp thành công tài khoản Nhân viên: "${userKey}"`);

    this.newStaffUser = '';
    this.newStaffPass = '';
    this.updateStaffCount();
  }

  logout() {
    localStorage.removeItem('ody_current_user');
    window.location.reload();
  }
}