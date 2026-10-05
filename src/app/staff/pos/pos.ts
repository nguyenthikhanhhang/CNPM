import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pos.html',
  styleUrl: './pos.css'
})
export class PosComponent implements OnInit {
  private apiService = inject(ApiService);

  products: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi gọi API:', err);
        this.isLoading = false;
      }
    });
  }
}