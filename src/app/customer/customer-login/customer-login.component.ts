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
    this.isRegisterMode = false; // Mặc định là form đăng nhập
  }

  // Xử lý gửi Form Đăng nhập / Đăng ký
  submitForm() {
    const userKey = this.username.trim().toLowerCase();
    const pass = this.password.trim();

    if (!userKey || !pass) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!');
      return;
    }

    let registeredUsers = JSON.parse(localStorage.getItem('ody_users') || '{}');

    // Cấu hình tài khoản Admin mặc định cố định: odyddey / 123456
    registeredUsers['odyddey'] = { 
      password: '123456', 
      role: 'admin', 
      roleName: 'Quản Trị Viên' 
    };
    localStorage.setItem('ody_users', JSON.stringify(registeredUsers));

    // Trường hợp ĐĂNG KÝ (Chỉ dành cho Khách Hàng)
    if (this.isRegisterMode) {
      if (this.role !== 'customer') {
        alert('Tài khoản nhân viên hoặc admin phải do Quản trị viên cấp phép!');
        return;
      }
      if (registeredUsers[userKey]) {
        alert('Tài khoản này đã tồn tại!');
        return;
      }
      registeredUsers[userKey] = { password: pass, role: 'customer', roleName: 'Khách Hàng' };
      localStorage.setItem('ody_users', JSON.stringify(registeredUsers));
      alert('Đăng ký tài khoản Khách Hàng thành công! Vui lòng đăng nhập.');
      this.isRegisterMode = false;
      this.password = '';
      return;
    } 

    // Trường hợp ĐĂNG NHẬP
    if (!registeredUsers[userKey]) {
      alert('Tài khoản không tồn tại trong hệ thống!');
      return;
    }

    if (registeredUsers[userKey].role !== this.role) {
      alert(`Tài khoản này không có quyền đăng nhập với vai trò là ${this.roleName}!`);
      return;
    }

    if (registeredUsers[userKey].password !== pass) {
      alert('Mật khẩu không chính xác!');
      return;
    }

    // Đăng nhập thành công -> Lưu session và tải lại trang
    const loggedInUser = {
      username: userKey,
      role: this.role,
      roleName: this.roleName
    };
    
    sessionStorage.setItem('ody_current_user', JSON.stringify(loggedInUser));
    this.loginSuccess.emit(loggedInUser);
    window.location.reload();
  }

  // Phát sự kiện đóng modal để trở về trang chủ khi bấm dấu X hoặc overlay
  cancel() {
    this.close.emit();
  }
}