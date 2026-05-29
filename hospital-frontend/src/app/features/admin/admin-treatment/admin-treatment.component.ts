import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Treatment } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-treatment', templateUrl: './admin-treatment.component.html' })
export class AdminTreatmentComponent implements OnInit {
  treatments: Treatment[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false; submitting = false;
  success = ''; error = '';

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      cost: ['', [Validators.min(0)]]
    });
    this.load();
  }

  load(): void { this.loading = true; this.api.getTreatments().subscribe({ next: t => { this.treatments = t; this.loading = false; }, error: () => this.loading = false }); }

  edit(t: Treatment): void { this.editingId = t.treatmentid; this.form.patchValue({ title: t.title, description: t.description, cost: t.cost }); }
  cancel(): void { this.editingId = null; this.form.reset(); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const data = this.form.value;
    const obs = this.editingId ? this.api.updateTreatment(this.editingId, data) : this.api.createTreatment(data);
    obs.subscribe({ next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); }, error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; } });
  }

  delete(id: number): void {
    if (!confirm('Delete this treatment?')) return;
    this.api.deleteTreatment(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }
}
