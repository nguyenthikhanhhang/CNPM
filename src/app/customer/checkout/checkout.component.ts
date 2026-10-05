import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() cartItems: any[] = [];
  @Input() totalPrice: number = 0;
  
  @Output() close = new EventEmitter<void>();
  @Output() orderSubmitted = new EventEmitter<any>();

  orderInfo = {
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  };

  // Biến nội dung chuyển khoản ngẫu nhiên
  transferContent: string = 'ODY ' + Math.floor(100000 + Math.random() * 900000);

  // Hàm tạo đường dẫn VietQR tự động theo tổng tiền (tổng tiền hàng + phí ship 30k)
  getVietQRUrl(): string {
    const bankId = 'MB'; // Mã ngân hàng của bạn
    const accountNo = '0987654321'; // Số tài khoản nhận tiền của bạn
    const template = 'compact2';
    const amount = this.totalPrice + 30000; 
    const description = encodeURIComponent(this.transferContent);
    
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${description}&accountName=ODYDDEY%20MENSWEAR`;
  }

  closeCheckout() {
    this.close.emit();
  }

  confirmOrder() {
    if (!this.orderInfo.name.trim() || !this.orderInfo.phone.trim() || !this.orderInfo.address.trim()) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }

    const finalOrder = {
      customer: this.orderInfo,
      items: this.cartItems,
      total: this.totalPrice + 30000,
      date: new Date()
    };

    this.orderSubmitted.emit(finalOrder);
  }
}