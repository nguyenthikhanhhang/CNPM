import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('Tất cả');
  
  // Lưu size được chọn theo từng sản phẩm ID
  selectedSizes = signal<{ [key: string]: string }>({});

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.productService.products().filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = category === 'Tất cả' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  });

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  selectSize(productId: string, size: string) {
    this.selectedSizes.update(prev => ({ ...prev, [productId]: size }));
  }

  addToCart(product: Product) {
    const chosenSize = this.selectedSizes()[product.id] || (product.sizes ? product.sizes[0] : 'Freesize');
    this.cartService.addToCart(product, chosenSize);
    alert(`Đã thêm "${product.name}" (Size: ${chosenSize}) vào giỏ hàng!`);
  }
}