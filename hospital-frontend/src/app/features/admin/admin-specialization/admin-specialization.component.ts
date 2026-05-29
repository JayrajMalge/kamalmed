import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Specialization } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-specialization', templateUrl: './admin-specialization.component.html' })
export class AdminSpecializationComponent implements OnInit {
  specializations: Specialization[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false;
  submitting = false;
  selectedImage: File | null = null;
  success = '';
  error = '';

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.load();
  }

  initForm(): void {
    this.form = this.fb.group({
      fieldname: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.required]
    });
  }

  load(): void {
    this.loading = true;
    this.api.getSpecializations().subscribe({ next: s => { this.specializations = s; this.loading = false; }, error: () => this.loading = false });
  }

  onImageChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedImage = input.files?.[0] || null;
  }

  edit(s: Specialization): void {
    this.editingId = s.speacializationid;
    this.form.patchValue({ fieldname: s.fieldname, description: s.description });
  }

  cancel(): void { this.editingId = null; this.form.reset(); this.selectedImage = null; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const fd = new FormData();
    fd.append('fieldname', this.form.value.fieldname);
    fd.append('description', this.form.value.description);
    if (this.selectedImage) fd.append('image', this.selectedImage);

    const obs = this.editingId
      ? this.api.updateSpecialization(this.editingId, fd)
      : this.api.createSpecialization(fd);

    obs.subscribe({
      next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); },
      error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this specialization?')) return;
    this.api.deleteSpecialization(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }

  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
