import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  isLoginMode = signal<boolean>(true);
  email = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Vui lòng điền đầy đủ Email và Mật khẩu!');
      return;
    }

    if (this.isLoginMode()) {
      const result = this.authService.login({ email: this.email, password: this.password });
      alert(result.message);
      if (result.success) {
        this.router.navigate(['/']);
      }
    } else {
      const result = this.authService.register({ email: this.email, password: this.password });
      alert(result.message);
      if (result.success) {
        this.isLoginMode.set(true);
      }
    }
  }
}