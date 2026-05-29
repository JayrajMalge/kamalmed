import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Doctor } from '../../../core/models/hospital.models';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-doctor-detail', templateUrl: './doctor-detail.component.html' })
export class DoctorDetailComponent implements OnInit {
  doctor: Doctor | null = null;
  loading = true;
  appointmentForm!: FormGroup;
  booked = false;
  booking = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getDoctor(id).subscribe({ next: d => { this.doctor = d; this.loading = false; }, error: () => this.loading = false });
    this.appointmentForm = this.fb.group({
      appointmentdate: ['', Validators.required],
      mobileno: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  bookAppointment(): void {
    if (this.appointmentForm.invalid || !this.doctor) return;
    this.booking = true;
    this.api.bookAppointment({ doctor: this.doctor, ...this.appointmentForm.value }).subscribe({
      next: () => { this.booked = true; this.booking = false; },
      error: () => this.booking = false
    });
  }

  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
