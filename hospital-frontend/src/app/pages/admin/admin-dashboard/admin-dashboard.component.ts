import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  adminUser = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.adminUser = localStorage.getItem('kamalmed_user') || 'Admin';
  }

  logout() {
    localStorage.removeItem('kamalmed_token');
    localStorage.removeItem('kamalmed_user');
    localStorage.removeItem('kamalmed_role');
    this.router.navigate(['/login']);
  }
}
