import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-danger">Khu Vực Quản Trị (Admin)</h2>
        <button class="btn btn-secondary" (click)="logout()">Đăng Xuất</button>
      </div>

      <!-- Quản Lý & Cấp Phép Tài Khoản Nhân Viên -->
      <div class="card shadow-sm p-4 mb-4">
        <h4 class="mb-3 text-primary">Quản Lý & Cấp Phép Tài Khoản Nhân Viên</h4>
        
        <div class="input-group mb-3">
          <input type="text" class="form-control" [(ngModel)]="newStaffUser" placeholder="Nhập tên tài khoản nhân viên mới...">
          <button class="btn btn-success" (click)="addStaff()">Cấp Phép Tài Khoản</button>
        </div>

        <h5>Danh sách nhân viên đang hoạt động:</h5>
        <ul class="list-group">
          <li *ngFor="let staff of approvedStaffs" class="list-group-item d-flex justify-content-between align-items-center">
            <span>👤 <b>{{ staff }}</b></span>
            <button class="btn btn-sm btn-danger" (click)="removeStaff(staff)">Thu Hồi Quyền</button>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  approvedStaffs: string[] = [];
  newStaffUser: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('approvedStaffs');
    if (stored) {
      this.approvedStaffs = JSON.parse(stored);
    } else {
      this.approvedStaffs = ['nhanvien1', 'staff01'];
      localStorage.setItem('approvedStaffs', JSON.stringify(this.approvedStaffs));
    }
  }

  addStaff() {
    if (!this.newStaffUser.trim()) {
      alert('Vui lòng nhập tên tài khoản!');
      return;
    }
    if (this.approvedStaffs.includes(this.newStaffUser)) {
      alert('Tài khoản này đã được cấp phép rồi!');
      return;
    }

    this.approvedStaffs.push(this.newStaffUser.trim());
    localStorage.setItem('approvedStaffs', JSON.stringify(this.approvedStaffs));
    alert(`Đã cấp phép thành công cho tài khoản: ${this.newStaffUser}`);
    this.newStaffUser = '';
  }

  removeStaff(staff: string) {
    if (confirm(`Bạn có chắc muốn thu hồi quyền của nhân viên [${staff}] không?`)) {
      this.approvedStaffs = this.approvedStaffs.filter(s => s !== staff);
      localStorage.setItem('approvedStaffs', JSON.stringify(this.approvedStaffs));
    }
  }

  logout() {
    // Xóa thông tin đăng nhập trong cả sessionStorage và localStorage
    sessionStorage.removeItem('ody_current_user');
    localStorage.removeItem('ody_current_user');
    
    // Điều hướng về trang chủ và làm mới trạng thái
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}