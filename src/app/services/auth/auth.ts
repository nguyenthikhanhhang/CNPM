import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users = signal<User[]>([]);
  currentUser = signal<User | null>(null);

  register(newUser: User): { success: boolean; message: string } {
    const existing = this.users().find(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Email này đã được đăng ký tài khoản!' };
    }
    this.users.update(list => [...list, newUser]);
    return { success: true, message: 'Đăng ký thành công! Hãy đăng nhập ngay.' };
  }

  login(credentials: User): { success: boolean; message: string } {
    const user = this.users().find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    
    if (!user) {
      return { success: false, message: 'Tài khoản chưa tồn tại! Vui lòng Đăng ký trước.' };
    }
    if (user.password !== credentials.password) {
      return { success: false, message: 'Mật khẩu không chính xác!' };
    }

    this.currentUser.set(user);
    return { success: true, message: 'Đăng nhập thành công!' };
  }
}