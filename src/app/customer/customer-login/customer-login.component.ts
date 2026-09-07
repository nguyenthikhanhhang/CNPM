import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ody-overlay">
      <div class="ody-modal">
        
        <!-- Nút đóng (X) -->
        <button (click)="cancel()" class="ody-close-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- BƯỚC 1: CHỌN VAI TRÒ -->
        <div *ngIf="step === 'select-role'">
          <div class="ody-header">
            <div class="ody-main-icon">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2>Cổng Đăng Nhập</h2>
            <p>Chọn vai trò hệ thống ODYDDEY để tiếp tục</p>
          </div>

          <div class="ody-role-list">
            <button (click)="chooseRole('customer')" class="ody-role-card">
              <div class="ody-emoji-box customer">🛍️</div>
              <div class="ody-role-info">
                <div class="title">Khách Hàng</div>
                <div class="desc">Mua sắm, xem đơn hàng và tích điểm</div>
              </div>
            </button>

            <button (click)="chooseRole('staff')" class="ody-role-card">
              <div class="ody-emoji-box staff">👨‍💼</div>
              <div class="ody-role-info">
                <div class="title">Nhân Viên Bán Hàng</div>
                <div class="desc">Hỗ trợ khách hàng và xử lý đơn</div>
              </div>
            </button>

            <button (click)="chooseRole('admin')" class="ody-role-card">
              <div class="ody-emoji-box admin">⚙️</div>
              <div class="ody-role-info">
                <div class="title">Quản Trị Viên (Admin)</div>
                <div class="desc">Quản trị toàn bộ hệ thống cửa hàng</div>
              </div>
            </button>
          </div>
        </div>

        <!-- BƯỚC 2: FORM ĐĂNG NHẬP / ĐĂNG KÝ -->
        <div *ngIf="step === 'login-form'">
          <div class="ody-form-header">
            <button (click)="step = 'select-role'" class="ody-back-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div>
              <h3>{{ isRegisterMode ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập' }}</h3>
              <span class="ody-role-tag">Vai trò: {{ roleName }}</span>
            </div>
          </div>

          <div class="ody-form-body">
            <div class="ody-input-group">
              <label>Tên đăng nhập hoặc Email</label>
              <input type="text" [(ngModel)]="username" placeholder="Nhập tài khoản của bạn...">
            </div>

            <div class="ody-input-group">
              <label>Mật khẩu</label>
              <input type="password" [(ngModel)]="password" placeholder="••••••••">
            </div>

            <button (click)="submitForm()" class="ody-submit-btn">
              {{ isRegisterMode ? 'Hoàn Tất Đăng Ký' : 'Đăng Nhập Hệ Thống' }}
            </button>

            <div class="ody-switch-mode">
              <p>
                {{ isRegisterMode ? 'Đã có tài khoản hệ thống?' : 'Bạn chưa có tài khoản?' }}
                <span (click)="isRegisterMode = !isRegisterMode" class="link">
                  {{ isRegisterMode ? 'Đăng nhập ngay' : 'Đăng ký tại đây' }}
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .ody-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center; z-index: 9999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .ody-modal {
      background: #ffffff; width: 100%; max-width: 440px; padding: 32px;
      border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      position: relative; box-sizing: border-box; animation: odyScaleIn 0.25s ease-out;
    }
    @keyframes odyScaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .ody-close-btn {
      position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none;
      width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; color: #64748b; cursor: pointer; transition: all 0.2s;
    }
    .ody-close-btn:hover { background: #e2e8f0; color: #0f172a; }
    
    .ody-header { text-align: center; margin-bottom: 24px; }
    .ody-main-icon {
      width: 64px; height: 64px; background: #e0e7ff; color: #4f46e5;
      border-radius: 20px; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }
    .ody-header h2 { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; }
    .ody-header p { font-size: 14px; color: #64748b; margin: 0; }

    .ody-role-list { display: flex; flex-direction: column; gap: 12px; }
    .ody-role-card {
      display: flex; align-items: center; width: 100%; padding: 14px 16px;
      background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;
      cursor: pointer; text-align: left; transition: all 0.2s ease;
    }
    .ody-role-card:hover {
      background: #ffffff; border-color: #4f46e5;
      box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.1); transform: translateY(-2px);
    }
    .ody-emoji-box {
      width: 44px; height: 44px; border-radius: 12px; display: flex;
      align-items: center; justify-content: center; font-size: 22px;
      margin-right: 14px; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }
    .ody-emoji-box.customer { background: #e0e7ff; }
    .ody-emoji-box.staff { background: #fef3c7; }
    .ody-emoji-box.admin { background: #f3e8ff; }
    
    .ody-role-info .title { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 2px; }
    .ody-role-info .desc { font-size: 12px; color: #64748b; }

    .ody-form-header { display: flex; align-items: center; margin-bottom: 24px; }
    .ody-back-btn {
      background: #f1f5f9; border: none; width: 36px; height: 36px;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      color: #64748b; cursor: pointer; margin-right: 12px; transition: all 0.2s;
    }
    .ody-back-btn:hover { background: #e2e8f0; color: #0f172a; }
    .ody-form-header h3 { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0; }
    .ody-role-tag {
      display: inline-block; background: #e0e7ff; color: #4f46e5;
      font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 20px;
    }

    .ody-form-body { display: flex; flex-direction: column; gap: 16px; }
    .ody-input-group label {
      display: block; font-size: 11px; font-weight: 800; color: #475569;
      text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .ody-input-group input {
      width: 100%; background: #f8fafc; border: 1px solid #cbd5e1;
      border-radius: 12px; padding: 12px 16px; font-size: 14px; color: #0f172a;
      outline: none; transition: all 0.2s; box-sizing: border-box;
    }
    .ody-input-group input:focus {
      border-color: #4f46e5; background: #ffffff;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
    }
    .ody-submit-btn {
      width: 100%; background: #4f46e5; color: #ffffff; border: none;
      padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 700;
      cursor: pointer; transition: all 0.2s; box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
      margin-top: 4px;
    }
    .ody-submit-btn:hover { background: #4338ca; }
    .ody-switch-mode { text-align: center; margin-top: 12px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
    .ody-switch-mode p { font-size: 13px; color: #64748b; margin: 0; }
    .ody-switch-mode .link { color: #4f46e5; font-weight: 700; cursor: pointer; margin-left: 4px; }
    .ody-switch-mode .link:hover { text-decoration: underline; }
  `]
})
export class CustomerLoginComponent {
  step: 'select-role' | 'login-form' = 'select-role';
  role: string = 'customer';
  roleName: string = 'Khách Hàng';
  username: string = '';
  password: string = '';
  isRegisterMode: boolean = false;

  @Output() loginSuccess = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  chooseRole(roleKey: string) {
    this.role = roleKey;
    if (roleKey === 'staff') {
      this.roleName = 'Nhân Viên Bán Hàng';
    } else if (roleKey === 'admin') {
      this.roleName = 'Quản Trị Viên';
    } else {
      this.roleName = 'Khách Hàng';
    }
    this.step = 'login-form';
    this.isRegisterMode = false;
  }

  submitForm() {
    const userKey = this.username.trim().toLowerCase();
    const pass = this.password.trim();

    if (!userKey || !pass) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    // Lấy danh sách tài khoản đã đăng ký từ localStorage (hoặc mảng tạm)
    let registeredUsers = JSON.parse(localStorage.getItem('ody_users') || '{}');

    if (this.isRegisterMode) {
      // Logic Đăng ký
      if (registeredUsers[userKey]) {
        alert('Tài khoản này đã tồn tại trên hệ thống! Vui lòng chuyển sang Đăng nhập.');
        this.isRegisterMode = false;
        return;
      }

      // Lưu tài khoản mới vào hệ thống
      registeredUsers[userKey] = { password: pass, role: this.role, roleName: this.roleName };
      localStorage.setItem('ody_users', JSON.stringify(registeredUsers));

      alert('Đăng ký tài khoản thành công! Hệ thống sẽ chuyển về trang Đăng nhập.');
      this.isRegisterMode = false; // Tự động chuyển về form đăng nhập sau khi đăng ký thành công
      this.password = ''; // Xóa mật khẩu để an toàn
      return;
    } 
    
    // Logic Đăng nhập (Ràng buộc: Chưa có tài khoản bắt buộc phải đăng ký)
    if (!registeredUsers[userKey]) {
      alert('Tài khoản chưa tồn tại trong hệ thống! Vui lòng bấm vào "Đăng ký tại đây" để tạo tài khoản trước khi đăng nhập.');
      this.isRegisterMode = true; // Tự động chuyển sang chế độ đăng ký
      return;
    }

    // Kiểm tra mật khẩu
    if (registeredUsers[userKey].password !== pass) {
      alert('Mật khẩu không chính xác!');
      return;
    }

    // Đăng nhập thành công
    alert(`Đăng nhập thành công với vai trò: ${this.roleName}`);
    const user = {
      name: this.username,
      role: this.role,
      roleName: this.roleName
    };
    this.loginSuccess.emit(user);
  }

  cancel() {
    this.close.emit();
  }
}