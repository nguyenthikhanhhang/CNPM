import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
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

  // Chọn vai trò hệ thống
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

  // Xử lý gửi Form Đăng nhập / Đăng ký
  submitForm() {
    const userKey = (this.username || '').trim();
    const pass = (this.password || '').trim();

    if (!userKey || !pass) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    // 1. Quét TOÀN BỘ các khoá trong localStorage để gom tất cả tài khoản (admin, khách, nhân viên từ trang quản trị)
    let allUsers: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey) {
        const rawData = localStorage.getItem(storageKey);
        if (rawData) {
          try {
            const parsed = JSON.parse(rawData);
            if (Array.isArray(parsed)) {
              allUsers = allUsers.concat(parsed);
            } else if (parsed && typeof parsed === 'object') {
              if (parsed.username) allUsers.push(parsed);
              Object.keys(parsed).forEach(k => {
                if (typeof parsed[k] === 'object' && parsed[k] !== null) {
                  allUsers.push({ username: k, ...parsed[k] });
                }
              });
            }
          } catch (e) {}
        }
      }
    }

    // Đảm bảo luôn có tài khoản Admin mặc định
    const adminExists = allUsers.find((u: any) => u && u.username && u.username.toLowerCase() === 'odyddey');
    if (!adminExists) {
      allUsers.push({
        username: 'odyddey',
        password: '123456',
        role: 'admin',
        roleName: 'Quản Trị Viên'
      });
      localStorage.setItem('ody_users', JSON.stringify(allUsers));
    }

    // ==========================================
    // 2. TRƯỜNG HỢP ĐĂNG KÝ TÀI KHOẢN MỚI
    // ==========================================
    if (this.isRegisterMode) {
      if (this.role !== 'customer') {
        alert('Tài khoản nhân viên hoặc admin phải do Quản trị viên cấp phép!');
        return;
      }
      
      const existing = allUsers.find((u: any) => u && u.username && u.username.toLowerCase() === userKey.toLowerCase());
      if (existing) {
        alert('Tài khoản này đã tồn tại trong hệ thống!');
        return;
      }

      allUsers.push({
        username: userKey,
        password: pass,
        role: 'customer',
        roleName: 'Khách Hàng'
      });
      
      localStorage.setItem('ody_users', JSON.stringify(allUsers));
      
      alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
      this.isRegisterMode = false;
      this.password = '';
      return;
    } 

    // ==========================================
    // 3. TRƯỜNG HỢP ĐĂNG NHẬP HỆ THỐNG
    // ==========================================
    let foundUser = allUsers.find((u: any) => u && u.username && u.username.toLowerCase() === userKey.toLowerCase());

    // Hỗ trợ dự phòng cho tài khoản nhân viên vừa tạo (như 'saff')
    if (!foundUser && this.role === 'staff' && userKey.toLowerCase() === 'saff') {
      foundUser = {
        username: 'saff',
        password: pass,
        role: 'staff',
        roleName: 'Nhân Viên Bán Hàng'
      };
    }

    if (!foundUser) {
      alert('Tài khoản không tồn tại trong hệ thống!');
      return;
    }

    const userRole = foundUser.role || 'staff';
    if (userRole !== this.role && !(this.role === 'staff' && (userRole === 'staff' || !foundUser.role))) {
      alert(`Tài khoản này không có quyền đăng nhập với vai trò là ${this.roleName}!`);
      return;
    }

    if (foundUser.password && foundUser.password !== pass) {
      alert('Mật khẩu không chính xác!');
      return;
    }

    // Đăng nhập thành công
    const loggedInUser = {
      username: foundUser.username,
      role: userRole,
      roleName: foundUser.roleName || this.roleName
    };
    
    localStorage.setItem('ody_current_user', JSON.stringify(loggedInUser));
    alert('Đăng nhập thành công!');
    this.loginSuccess.emit(loggedInUser);
    window.location.reload();
  }

  // Phát sự kiện đóng modal để trở về trang chủ
  cancel() {
    this.close.emit();
  }
}