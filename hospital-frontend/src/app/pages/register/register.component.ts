import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(
    private webClient: WebClientService,
    private router: Router
  ) {}

  register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'All fields are required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters long.';
      return;
    }

    this.loading = true;
    this.error = '';

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.webClient.register<any, any>('api/auth/register', payload).subscribe({
      next: (res) => {
        this.loading = false;
        // Save details to localStorage
        this.webClient.setToken(res.token);
        localStorage.setItem('kamalmed_user', res.username);
        localStorage.setItem('kamalmed_role', res.role);

        // Redirect to home (as role will be Visitor)
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Registration error:', err);
        this.error = err.error?.message || 'Registration failed. Check username/email uniqueness.';
      }
    });
  }
}
