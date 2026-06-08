import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  role = '';
  isMobileMenuOpen = false;
  isScrolled = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkSession();
    setInterval(() => this.checkSession(), 1000);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  checkSession() {
    const token = localStorage.getItem('kamalmed_token');
    const user = localStorage.getItem('kamalmed_user');
    const role = localStorage.getItem('kamalmed_role');

    if (token) {
      this.isLoggedIn = true;
      this.username = user || '';
      this.role = role || '';
    } else {
      this.isLoggedIn = false;
      this.username = '';
      this.role = '';
    }
  }

  logout() {
    localStorage.removeItem('kamalmed_token');
    localStorage.removeItem('kamalmed_user');
    localStorage.removeItem('kamalmed_role');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
