import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.html',
  styleUrls: ['./staff.css']
})
export class StaffComponent {
  orders = [
    { id: 'OD101', customer: 'Nguyễn Văn A', phone: '0901234567', total: 830000, status: 'Chờ xác nhận', statusCode: 'pending' },
    { id: 'OD102', customer: 'Trần Thị B', phone: '0987654321', total: 350000, status: 'Đã xác nhận', statusCode: 'approved' },
    { id: 'OD103', customer: 'Lê Văn C', phone: '0911223344', total: 1130000, status: 'Đang giao hàng', statusCode: 'shipping' }
  ];

  updateStatus(order: any, code: string, text: string) {
    order.statusCode = code;
    order.status = text;
  }
}