import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Facility } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-facility', templateUrl: './admin-facility.component.html' })
export class AdminFacilityComponent implements OnInit {
  facilities: Facility[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false; submitting = false;
  selectedImages: File[] = [];
  success = ''; error = '';

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      facilityname: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', Validators.required],
      facilitytype: [''],
      availability: ['yes', Validators.required]
    });
    this.load();
  }

  load(): void { this.loading = true; this.api.getFacilities().subscribe({ next: f => { this.facilities = f; this.loading = false; }, error: () => this.loading = false }); }

  onImagesChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedImages = input.files ? Array.from(input.files) : [];
  }

  edit(f: Facility): void {
    this.editingId = f.facilitesid;
    this.form.patchValue({ facilityname: f.facilityname, description: f.description, facilitytype: f.facilitytype, availability: f.availability });
  }
  cancel(): void { this.editingId = null; this.form.reset(); this.selectedImages = []; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const fd = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) => { if (v) fd.append(k, v as string); });
    this.selectedImages.forEach(img => fd.append('images', img));
    const obs = this.editingId ? this.api.updateFacility(this.editingId, fd) : this.api.createFacility(fd);
    obs.subscribe({ next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); }, error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; } });
  }

  delete(id: number): void {
    if (!confirm('Delete this facility?')) return;
    this.api.deleteFacility(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }
}
