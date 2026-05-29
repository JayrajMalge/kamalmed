import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Specialization } from '../../../core/models/hospital.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;
  specializations: Specialization[] = [];

  constructor(public auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSpecializations().subscribe(s => this.specializations = s.slice(0, 6));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
  }

  logout(): void { this.auth.logout(); }
  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }
}
