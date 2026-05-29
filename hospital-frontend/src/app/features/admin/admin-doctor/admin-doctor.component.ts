import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Doctor, Specialization } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-doctor', templateUrl: './admin-doctor.component.html' })
export class AdminDoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  specializations: Specialization[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false; submitting = false;
  selectedPhoto: File | null = null;
  success = ''; error = '';

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10,12}$/)]],
      about: [''],
      schedulefrom: [''],
      scheduleto: [''],
      specIds: [[]]
    });
    this.load();
    this.api.getSpecializations().subscribe(s => this.specializations = s);
  }

  load(): void { this.loading = true; this.api.getDoctors().subscribe({ next: d => { this.doctors = d; this.loading = false; }, error: () => this.loading = false }); }

  onPhotoChange(e: Event): void { const i = e.target as HTMLInputElement; this.selectedPhoto = i.files?.[0] || null; }

  edit(d: Doctor): void {
    this.editingId = d.doctorid;
    this.form.patchValue({ name: d.name, email: d.email, phone: d.phone, about: d.about, schedulefrom: d.schedulefrom, scheduleto: d.scheduleto });
  }
  cancel(): void { this.editingId = null; this.form.reset(); this.selectedPhoto = null; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const fd = new FormData();
    const { specIds, ...rest } = this.form.value;
    fd.append('doctor', new Blob([JSON.stringify(rest)], { type: 'application/json' }));
    if (this.selectedPhoto) fd.append('photo', this.selectedPhoto);
    if (specIds?.length) specIds.forEach((id: number) => fd.append('specIds', id.toString()));
    const obs = this.editingId ? this.api.updateDoctor(this.editingId, fd) : this.api.createDoctor(fd);
    obs.subscribe({ next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); }, error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; } });
  }

  delete(id: number): void {
    if (!confirm('Delete this doctor?')) return;
    this.api.deleteDoctor(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }

  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }

  isSpecSelected(id: number): boolean { return (this.form.value.specIds || []).includes(id); }

  toggleSpec(id: number): void {
    const ids: number[] = this.form.value.specIds || [];
    const idx = ids.indexOf(id);
    if (idx === -1) ids.push(id); else ids.splice(idx, 1);
    this.form.patchValue({ specIds: [...ids] });
  }
}
