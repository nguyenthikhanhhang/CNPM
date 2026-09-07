import { Injectable, signal } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes?: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  categories = signal<string[]>([
    'Tất cả',
    'Áo thun',
    'Áo khoác',
    'Quần',
    'Phụ kiện'
  ]);

  products = signal<Product[]>([
    // Áo thun
    { 
      id: '1', 
      name: 'ODYSSEY Oversized Tee White', 
      price: 450000, 
      category: 'Áo thun', 
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo thun trắng cotton 100% phông rộng phong cách Minimalist',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: '2', 
      name: 'ODYSSEY Graphic Logo Tee Black', 
      price: 480000, 
      category: 'Áo thun', 
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo thun đen in graphic Streetwear cá tính',
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: '3', 
      name: 'ODYSSEY Vintage Wash Tee', 
      price: 520000, 
      category: 'Áo thun', 
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo thun xám washed hiệu ứng xước bụi phủi',
      sizes: ['S', 'M', 'L', 'XL']
    },

    // Áo khoác (Link ảnh chuẩn mẫu Lookbook)
    { 
      id: '4', 
      name: 'ODYSSEY Hoodie Black', 
      price: 890000, 
      category: 'Áo khoác', 
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo Hoodie đen nỉ phông rộng Streetwear',
      sizes: ['M', 'L', 'XL']
    },
    { 
      id: '5', 
      name: 'ODYSSEY Bomber Jacket Olive', 
      price: 1250000, 
      category: 'Áo khoác', 
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo khoác Bomber xanh rêu dầy dặn chèn lót gió',
      sizes: ['M', 'L', 'XL']
    },
    { 
      id: '6', 
      name: 'ODYSSEY Denim Jacket Blue', 
      price: 990000, 
      category: 'Áo khoác', 
      image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop&q=80', 
      description: 'Áo khoác Denim bò xanh đậm unisex',
      sizes: ['S', 'M', 'L', 'XL']
    },

    // Quần
    { 
      id: '7', 
      name: 'ODYSSEY Cargo Pants Gray', 
      price: 750000, 
      category: 'Quần', 
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80', 
      description: 'Quần túi hộp dáng suông cá tính',
      sizes: ['29', '30', '31', '32']
    },
    { 
      id: '8', 
      name: 'ODYSSEY Wide Leg Sweatpants', 
      price: 650000, 
      category: 'Quần', 
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80', 
      description: 'Quần thun nỉ ống rộng unisex năng động',
      sizes: ['M', 'L', 'XL']
    },
    { 
      id: '9', 
      name: 'ODYSSEY Straight Denim Jeans', 
      price: 820000, 
      category: 'Quần', 
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80', 
      description: 'Quần Jeans xanh ống đứng form đẹp',
      sizes: ['29', '30', '31', '32']
    },

    // Phụ kiện
    { 
      id: '10', 
      name: 'ODYSSEY Streetwear Cap', 
      price: 290000, 
      category: 'Phụ kiện', 
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80', 
      description: 'Mũ lưỡi trai thêu logo thô mịn cao cấp',
      sizes: ['Freesize']
    },
    { 
      id: '11', 
      name: 'ODYSSEY Crossbody Bag', 
      price: 420000, 
      category: 'Phụ kiện', 
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', 
      description: 'Túi bao tử đeo chéo chống nước gọn nhẹ',
      sizes: ['Freesize']
    }
  ]);

  getProducts(): Product[] {
    return this.products();
  }
}