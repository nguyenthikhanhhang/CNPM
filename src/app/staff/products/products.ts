import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
      <h3>➕ Thêm Sản Phẩm Mới Vào Hệ Thống</h3>

      <form (submit)="addProduct($event)" style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px; background: #fdfdfd; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <div>
          <label style="font-weight: bold;">Tên sản phẩm:</label><br>
          <input type="text" [(ngModel)]="newProduct.name" name="name" required placeholder="Nhập tên sản phẩm..." style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
        </div>

        <div>
          <label style="font-weight: bold;">Giá tiền (VND):</label><br>
          <input type="number" [(ngModel)]="newProduct.price" name="price" required placeholder="Nhập giá sản phẩm..." style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
        </div>

        <div>
          <label style="font-weight: bold;">Số lượng tồn kho:</label><br>
          <input type="number" [(ngModel)]="newProduct.stock" name="stock" required placeholder="Nhập số lượng tồn..." style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
        </div>

        <button type="submit" style="background: #007bff; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px; font-weight: bold; font-size: 16px;">
          💾 Lưu Sản Phẩm Mới
        </button>
      </form>
    </div>
  `
})
export class Products {
  newProduct = {
    name: '',
    price: 0,
    stock: 0
  };

  addProduct(event: Event) {
    event.preventDefault();
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Vui lòng điền đầy đủ tên và giá sản phẩm hợp lệ!');
      return;
    }

    alert(`Thêm thành công sản phẩm mới: "${this.newProduct.name}" (${this.newProduct.price.toLocaleString()} VND)`);
    this.newProduct = { name: '', price: 0, stock: 0 };
  }
}