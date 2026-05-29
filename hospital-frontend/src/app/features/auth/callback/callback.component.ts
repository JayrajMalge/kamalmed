import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-callback', template: '<div class="loader"><div class="spinner"></div></div>' })
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const role = params['role'];
      if (token) {
        this.auth.saveSession({ token, username: 'user', role, email: '' });
        this.router.navigate([role === 'Admin' ? '/admin' : '/']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
