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