import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Specialization, SubSpecialization } from '../../../core/models/hospital.models';

@Component({ selector: 'app-specialization-detail', templateUrl: './specialization-detail.component.html' })
export class SpecializationDetailComponent implements OnInit {
  specialization: Specialization | null = null;
  subSpecs: SubSpecialization[] = [];
  activeSubSpec: SubSpecialization | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getSpecialization(id).subscribe(s => {
      this.specialization = s;
      this.loading = false;
    });
    this.api.getSubSpecializations(id).subscribe(s => {
      this.subSpecs = s;
      this.activeSubSpec = s[0] || null;
    });
  }

  selectSub(sub: SubSpecialization): void { this.activeSubSpec = sub; }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
