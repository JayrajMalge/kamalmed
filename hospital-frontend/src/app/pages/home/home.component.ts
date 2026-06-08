import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  specializations: any[] = [];
  doctors: any[] = [];
  news: any[] = [];
  facilities: any[] = [];
  loading = true;

  // Carousel state
  currentSlide = 0;
  carouselInterval: any;

  // Doctor carousel
  doctorOffset = 0;
  doctorsPerPage = 4;

  // News carousel
  newsOffset = 0;
  newsPerPage = 3;

  readonly BASE_URL = 'http://localhost:8080/uploads/';

  carouselSlides = [
    {
      headline: 'Advanced Cancer Care:<br>Personalised for You',
      sub: 'Compassionate. Precise. Comprehensive.',
      cta: 'Book Appointment',
      ctaLink: '/doctors-appointments',
      bg: 'slide-1'
    },
    {
      headline: 'World-Class Oncology<br>Under One Roof',
      sub: 'State-of-the-art diagnostics and cutting-edge treatment protocols.',
      cta: 'Explore Specializations',
      ctaLink: '/specializations',
      bg: 'slide-2'
    },
    {
      headline: 'Expert Doctors.<br>Compassionate Care.',
      sub: 'Our multidisciplinary team puts your recovery first.',
      cta: 'Meet Our Doctors',
      ctaLink: '/doctors-appointments',
      bg: 'slide-3'
    }
  ];

  stats = [
    { icon: 'fa-user-doctor', value: '50+', label: 'Expert Doctors' },
    { icon: 'fa-hospital', value: '200+', label: 'Patient Beds' },
    { icon: 'fa-briefcase-medical', value: '15+', label: 'Specialties' },
    { icon: 'fa-heart-pulse', value: '10K+', label: 'Happy Patients' }
  ];

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.startCarousel();
    this.fetchData();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  fetchData() {
    this.webClient.get<any[]>('api/specializations').subscribe({
      next: (data) => { this.specializations = data || []; },
      error: () => { this.specializations = []; }
    });

    this.webClient.get<any[]>('api/facilities').subscribe({
      next: (data) => { this.facilities = (data || []).slice(0, 6); },
      error: () => { this.facilities = []; }
    });

    this.webClient.get<any[]>('api/doctors').subscribe({
      next: (data) => {
        this.doctors = (data || []).filter((d: any) => !d.resigndate);
        this.loading = false;
      },
      error: () => { this.doctors = []; this.loading = false; }
    });

    this.webClient.get<any[]>('api/news').subscribe({
      next: (data) => { this.news = (data || []).slice(0, 9); },
      error: () => { this.news = []; }
    });
  }

  // ── Hero Carousel ──────────────────────────────────────────
  startCarousel() {
    this.carouselInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopCarousel() {
    clearInterval(this.carouselInterval);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselSlides.length) % this.carouselSlides.length;
    this.resetCarouselTimer();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetCarouselTimer();
  }

  resetCarouselTimer() {
    this.stopCarousel();
    this.startCarousel();
  }

  // ── Doctors Carousel ──────────────────────────────────────
  get visibleDoctors(): any[] {
    return this.doctors.slice(this.doctorOffset, this.doctorOffset + this.doctorsPerPage);
  }

  nextDoctors() {
    if (this.doctorOffset + this.doctorsPerPage < this.doctors.length) {
      this.doctorOffset += this.doctorsPerPage;
    }
  }

  prevDoctors() {
    if (this.doctorOffset > 0) {
      this.doctorOffset -= this.doctorsPerPage;
    }
  }

  get doctorPageCount(): number {
    return Math.ceil(this.doctors.length / this.doctorsPerPage);
  }

  get doctorCurrentPage(): number {
    return Math.floor(this.doctorOffset / this.doctorsPerPage);
  }

  // ── News Carousel ─────────────────────────────────────────
  get visibleNews(): any[] {
    return this.news.slice(this.newsOffset, this.newsOffset + this.newsPerPage);
  }

  nextNews() {
    if (this.newsOffset + this.newsPerPage < this.news.length) {
      this.newsOffset += this.newsPerPage;
    }
  }

  prevNews() {
    if (this.newsOffset > 0) {
      this.newsOffset -= this.newsPerPage;
    }
  }

  // ── Helpers ───────────────────────────────────────────────
  getDoctorImage(doctor: any): string {
    if (doctor.profilephotopath) {
      return this.BASE_URL + doctor.profilephotopath;
    }
    return 'assets/doctor-placeholder.png';
  }

  getSpecImage(spec: any): string {
    if (spec.imagepath) {
      return this.BASE_URL + spec.imagepath;
    }
    return 'assets/placeholder-spec.png';
  }

  getNewsImage(newsItem: any): string {
    if (newsItem.images && newsItem.images.length > 0 && newsItem.images[0].imagepath) {
      return this.BASE_URL + newsItem.images[0].imagepath;
    }
    return 'assets/news-placeholder.png';
  }

  getDoctorSpecializations(doctor: any): string {
    if (!doctor.specializations || doctor.specializations.length === 0) return 'General Physician';
    return doctor.specializations
      .map((ds: any) => ds.specialization?.fieldname || '')
      .filter(Boolean)
      .join(', ');
  }

  truncate(text: string, len: number): string {
    if (!text) return '';
    return text.length > len ? text.substring(0, len) + '...' : text;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  @HostListener('window:resize')
  onResize() {
    const w = window.innerWidth;
    this.doctorsPerPage = w < 600 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4;
    this.newsPerPage = w < 600 ? 1 : w < 900 ? 2 : 3;
    this.doctorOffset = 0;
    this.newsOffset = 0;
  }
}
