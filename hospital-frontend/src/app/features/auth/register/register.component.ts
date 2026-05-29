import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-register', templateUrl: './register.component.html' })
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      confirm: ['', Validators.required]
    }, { validators: this.passwordMatch });
  }

  passwordMatch(fg: FormGroup): { [key: string]: boolean } | null {
    return fg.get('password')?.value === fg.get('confirm')?.value ? null : { mismatch: true };
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    const { username, email, password } = this.form.value;
    this.auth.register(username, email, password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: (e) => { this.loading = false; this.error = e.error?.message || 'Registration failed.'; }
    });
  }
}
