import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Disease } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-disease', templateUrl: './admin-disease.component.html' })
export class AdminDiseaseComponent implements OnInit {
  diseases: Disease[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false; submitting = false;
  selectedImages: File[] = [];
  success = ''; error = '';

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({ name: ['', [Validators.required, Validators.maxLength(40)]], description: ['', Validators.required] });
    this.load();
  }

  load(): void { this.loading = true; this.api.getDiseases().subscribe({ next: d => { this.diseases = d; this.loading = false; }, error: () => this.loading = false }); }

  onImagesChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedImages = input.files ? Array.from(input.files) : [];
  }

  edit(d: Disease): void { this.editingId = d.diseaseid; this.form.patchValue({ name: d.name, description: d.description }); }
  cancel(): void { this.editingId = null; this.form.reset(); this.selectedImages = []; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const fd = new FormData();
    fd.append('name', this.form.value.name);
    fd.append('description', this.form.value.description);
    this.selectedImages.forEach(img => fd.append('images', img));
    const obs = this.editingId ? this.api.updateDisease(this.editingId, fd) : this.api.createDisease(fd);
    obs.subscribe({ next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); }, error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; } });
  }

  delete(id: number): void {
    if (!confirm('Delete this disease?')) return;
    this.api.deleteDisease(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }
}
