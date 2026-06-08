import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private webClient: WebClientService,
    private router: Router
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password.';
      return;
    }

    this.loading = true;
    this.error = '';

    const payload = {
      username: this.username,
      password: this.password
    };

    this.webClient.login<any, any>('api/auth/login', payload).subscribe({
      next: (res) => {
        this.loading = false;
        // Save details to localStorage
        this.webClient.setToken(res.token);
        localStorage.setItem('kamalmed_user', res.username);
        localStorage.setItem('kamalmed_role', res.role);

        // Redirect based on role
        if (res.role === 'Admin') {
          this.router.navigate(['/admin/specializations']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        this.error = 'Invalid username or password.';
      }
    });
  }
}
