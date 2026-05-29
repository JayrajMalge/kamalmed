import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-admin-layout', templateUrl: './admin-layout.component.html' })
export class AdminLayoutComponent {
  menuItems = [
    { label: 'Specializations', icon: 'fa-stethoscope', route: '/admin/specializations' },
    { label: 'Diseases', icon: 'fa-virus', route: '/admin/diseases' },
    { label: 'Facilities', icon: 'fa-hospital-alt', route: '/admin/facilities' },
    { label: 'News & Blogs', icon: 'fa-newspaper', route: '/admin/news' },
    { label: 'Treatments', icon: 'fa-heartbeat', route: '/admin/treatments' },
    { label: 'Doctors', icon: 'fa-user-md', route: '/admin/doctors' },
    { label: 'Appointments', icon: 'fa-calendar-check', route: '/admin/appointments' },
  ];

  constructor(public auth: AuthService, private router: Router) {}
  logout(): void { this.auth.logout(); }
  goHome(): void { this.router.navigate(['/']); }
}
