import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '24ct1-nguyen-thi-khanh-hang';
  
  selectedRole: string = 'customer';
  showAuthModal: boolean = false;
  isCartOpen: boolean = false;
  showOrdersModal: boolean = false;
  authMode: string = 'login';

  selectRole(role: string): void {
    this.selectedRole = role;
  }

  closeAuthModal(): void {
    this.showAuthModal = false;
  }

  openAuthModal(): void {
    this.showAuthModal = true;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  openOrdersModal(): void {
    this.showOrdersModal = true;
  }

  switchAuthMode(mode: string): void {
    this.authMode = mode;
  }
}