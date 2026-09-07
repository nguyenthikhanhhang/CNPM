import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerLoginComponent, CheckoutComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  categories: string[] = ['Tất Cả', 'Áo Sơ Mi', 'Áo Polo', 'Quần Jeans', 'Áo Khoác', 'Quần Short/Kaki'];
  selectedCategory: string = 'Tất Cả';

  products: any[] = [
    {
      id: 1,
      title: 'Áo Sơ Mi Premium',
      price: 350000,
      category: 'Áo Sơ Mi',
      image: 'https://cdn.hstatic.net/products/1000253775/160-somi-378-1__2__20e9ebe87b904bde8468fdfac079c6bf_compact.png'
    },
    {
      id: 2,
      title: 'Áo Polo Nam Cổ Bẻ',
      price: 280000,
      category: 'Áo Polo',
      image: 'https://cdn.hstatic.net/products/1000253775/160-polo-316-7_cb7719bbd9ab49dfb3b881a350faa514_compact.jpg'
    },
    {
      id: 3,
      title: 'Quần Jeans Slimfit',
      price: 450000,
      category: 'Quần Jeans',
      image: 'https://cdn.hstatic.net/products/1000253775/160_jean_287_1_021a101e5eb34c3f8d1987520e982819_compact.jpg'
    },
    {
      id: 4,
      title: 'Áo Khoác Bomber',
      price: 550000,
      category: 'Áo Khoác',
      image: 'https://cdn.hstatic.net/products/1000253775/ao-khoac-gio-nam-icondenim-wild-track-form-loose-2_9ed05d6091fe4068b502905eaebd4188_compact.jpg'
    },
    {
      id: 5,
      title: 'Áo Sơ Mi Oxford Xanh',
      price: 370000,
      category: 'Áo Sơ Mi',
      image: 'https://cdn.hstatic.net/products/1000253775/160-somi-378-13_2ce2bde79cc34c17b7a930e121df0936_compact.png'
    },
    {
      id: 6,
      title: 'Áo Polo Thể Thao',
      price: 290000,
      category: 'Áo Polo',
      image: 'https://cdn.hstatic.net/products/1000253775/ao-polo-nam-icondenim-procool-luxe-chrome__9__67aaf8ef1a2a4ae99bdde98f5df6e3ee_compact.jpg'
    },
    {
      id: 7,
      title: 'Quần Short Kaki Nam',
      price: 220000,
      category: 'Quần Short/Kaki',
      image: 'https://cdn.hstatic.net/products/1000253775/qsid0295__5__5d7432f55912464f9d8d31ad22c5229d_compact.jpg'
    },
    {
      id: 8,
      title: 'Áo Khoác Dù',
      price: 490000,
      category: 'Áo Khoác',
      image: 'https://cdn.hstatic.net/products/1000253775/ao-khoac-gio-nam-icondenim-wild-track-form-loose-1_6f0f53362caf41229dc89f91e2d9f30b_compact.jpg'
    },
    {
      id: 9,
      title: 'Quần Jeans Rách Nhẹ',
      price: 480000,
      category: 'Quần Jeans',
      image: 'https://cdn.hstatic.net/products/1000253775/160_jean_287_14_60170eebe3744f43b840403d14c1369b_compact.jpg'
    },
    {
      id: 10,
      title: 'Áo Sơ Mi Họa Tiết',
      price: 390000,
      category: 'Áo Sơ Mi',
      image: 'https://cdn.hstatic.net/products/1000253775/in_motion_-_smid0445__3__5b0fb726ad69488497215c7fa58db929_compact.jpg'
    }
  ];

  filteredProducts: any[] = [];
  cart: any[] = [];
  ordersList: any[] = [];
  
  isCartOpen: boolean = false;
  showAuthModal: boolean = false;
  showOrdersModal: boolean = false;
  showCheckoutModal: boolean = false;
  
  currentUser: any = null;
  lastOrder: any = null;

  ngOnInit() {
    this.filteredProducts = this.products;
  }

  filterCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'Tất Cả') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
    this.isCartOpen = true;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  openAuthModal() {
    this.showAuthModal = true;
  }

  closeAuthModal() {
    this.showAuthModal = false;
  }

  onLoginSuccess(user: any) {
    this.currentUser = user; 
    this.showAuthModal = false;
  }

  logout() {
    this.currentUser = null;
  }

  openOrdersModal() {
    this.showOrdersModal = true;
  }

  closeOrdersModal() {
    this.showOrdersModal = false;
  }

  checkout() {
    if (!this.currentUser) {
      alert('Vui lòng đăng nhập trước khi thanh toán!');
      this.openAuthModal();
      return;
    }
    if (this.cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    this.showCheckoutModal = true;
    this.isCartOpen = false;
  }

  onOrderSuccess(orderData: any) {
    this.lastOrder = orderData;
    this.ordersList.push(orderData);
    this.showCheckoutModal = false;
    this.cart = [];
    alert('Đặt hàng thành công!');
  }
}