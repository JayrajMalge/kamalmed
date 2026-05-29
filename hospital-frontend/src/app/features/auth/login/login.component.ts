import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate([res.role === 'Admin' ? '/admin' : '/']);
      },
      error: (e) => { this.loading = false; this.error = e.error?.message || 'Invalid username or password.'; }
    });
  }

  loginGoogle(): void { this.auth.loginWithGoogle(); }
}
