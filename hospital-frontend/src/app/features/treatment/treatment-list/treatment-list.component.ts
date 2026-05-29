import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Treatment } from '../../../core/models/hospital.models';

@Component({ selector: 'app-treatment-list', templateUrl: './treatment-list.component.html' })
export class TreatmentListComponent implements OnInit {
  treatments: Treatment[] = [];
  loading = true;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getTreatments().subscribe({ next: t => { this.treatments = t; this.loading = false; }, error: () => this.loading = false }); }
}
