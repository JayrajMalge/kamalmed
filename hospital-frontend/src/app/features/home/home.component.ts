import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Specialization, Doctor, News, Facility } from '../../core/models/hospital.models';

@Component({ selector: 'app-home', templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  specializations: Specialization[] = [];
  doctors: Doctor[] = [];
  news: News[] = [];
  facilities: Facility[] = [];
  activeSpec: Specialization | null = null;
  currentSlide = 0;

  slides = [
    { title: 'Advanced Cancer Care:', subtitle: 'Personalised for You', tag: 'Compassionate. Precise. Comprehensive.' },
    { title: 'Comprehensive Cancer Treatment', subtitle: 'Expert Oncology Team', tag: 'Your health. Our mission.' },
    { title: 'Specialised Medical Care', subtitle: 'All Under One Roof', tag: 'State-of-the-art technology.' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSpecializations().subscribe(s => {
      this.specializations = s;
      this.activeSpec = s[0] || null;
    });
    this.api.getDoctors().subscribe(d => this.doctors = d.slice(0, 6));
    this.api.getNews().subscribe(n => this.news = n.slice(0, 3));
    this.api.getFacilities().subscribe(f => this.facilities = f.slice(0, 4));
    setInterval(() => this.nextSlide(), 5000);
  }

  selectSpec(s: Specialization): void { this.activeSpec = s; }
  nextSlide(): void { this.currentSlide = (this.currentSlide + 1) % this.slides.length; }
  prevSlide(): void { this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length; }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
