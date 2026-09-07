import { Injectable, signal } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<CartItem[]>([]);
  totalItems = signal<number>(0);

  addToCart(product: Product, size: string) {
    const currentItems = this.cartItems();
    const itemKey = `${product.id}-${size}`;
    const existingIndex = currentItems.findIndex(item => `${item.id}-${item.selectedSize}` === itemKey);

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex].quantity += 1;
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          selectedSize: size
        }
      ]);
    }

    this.totalItems.set(this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  }
}