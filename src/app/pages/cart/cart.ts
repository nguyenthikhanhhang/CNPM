import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart';

export interface OrderInvoice {
  orderId: string;
  orderDate: Date;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  totalPrice: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cartService = inject(CartService);

  // Thông tin giao hàng
  customerName = '';
  phone = '';
  address = '';
  paymentMethod = 'COD';

  // Trạng thái Hóa đơn
  invoice = signal<OrderInvoice | null>(null);

  // Tính tổng tiền giỏ hàng (Đơn giá x Số lượng)
  totalAmount = computed(() => {
    return this.cartService.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  processOrder() {
    if (this.cartService.cartItems().length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    if (!this.customerName || !this.phone || !this.address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }

    const newInvoice: OrderInvoice = {
      orderId: 'ODS-' + Math.floor(100000 + Math.random() * 900000),
      orderDate: new Date(),
      customerName: this.customerName,
      phone: this.phone,
      address: this.address,
      paymentMethod: this.paymentMethod,
      items: [...this.cartService.cartItems()],
      totalPrice: this.totalAmount()
    };

    this.invoice.set(newInvoice);

    // Xóa sạch giỏ hàng sau khi tạo hóa đơn thành công
    this.cartService.cartItems.set([]);
    this.cartService.totalItems.set(0);
  }

  resetForm() {
    this.invoice.set(null);
    this.customerName = '';
    this.phone = '';
    this.address = '';
  }
}