import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Specialization } from '../../../core/models/hospital.models';

@Component({ selector: 'app-specialization-list', templateUrl: './specialization-list.component.html' })
export class SpecializationListComponent implements OnInit {
  specializations: Specialization[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSpecializations().subscribe({ next: s => { this.specializations = s; this.loading = false; }, error: () => this.loading = false });
  }

  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
