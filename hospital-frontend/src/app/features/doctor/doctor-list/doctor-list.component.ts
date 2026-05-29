import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Doctor } from '../../../core/models/hospital.models';

@Component({ selector: 'app-doctor-list', templateUrl: './doctor-list.component.html' })
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = true;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getDoctors().subscribe({ next: d => { this.doctors = d; this.loading = false; }, error: () => this.loading = false }); }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
