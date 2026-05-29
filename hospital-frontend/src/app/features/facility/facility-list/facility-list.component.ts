import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Facility } from '../../../core/models/hospital.models';

@Component({ selector: 'app-facility-list', templateUrl: './facility-list.component.html' })
export class FacilityListComponent implements OnInit {
  facilities: Facility[] = [];
  loading = true;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getFacilities().subscribe({ next: f => { this.facilities = f; this.loading = false; }, error: () => this.loading = false }); }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
