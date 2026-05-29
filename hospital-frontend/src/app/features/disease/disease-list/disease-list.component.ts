import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Disease } from '../../../core/models/hospital.models';

@Component({ selector: 'app-disease-list', templateUrl: './disease-list.component.html' })
export class DiseaseListComponent implements OnInit {
  diseases: Disease[] = [];
  activeDisease: Disease | null = null;
  loading = true;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getDiseases().subscribe({ next: d => { this.diseases = d; this.activeDisease = d[0] || null; this.loading = false; }, error: () => this.loading = false });
  }
  selectDisease(d: Disease): void { this.activeDisease = d; }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
