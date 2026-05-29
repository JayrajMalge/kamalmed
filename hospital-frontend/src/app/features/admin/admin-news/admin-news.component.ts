import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { News } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-news', templateUrl: './admin-news.component.html' })
export class AdminNewsComponent implements OnInit {
  newsList: News[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  loading = false; submitting = false;
  selectedImages: File[] = [];
  success = ''; error = '';
  types = ['News', 'Blog'];

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.required],
      newstype: ['News']
    });
    this.load();
  }

  load(): void { this.loading = true; this.api.getNews().subscribe({ next: n => { this.newsList = n; this.loading = false; }, error: () => this.loading = false }); }

  onImagesChange(e: Event): void { const i = e.target as HTMLInputElement; this.selectedImages = i.files ? Array.from(i.files) : []; }

  edit(n: News): void { this.editingId = n.newsid; this.form.patchValue({ title: n.title, description: n.description, newstype: n.newstype }); }
  cancel(): void { this.editingId = null; this.form.reset({ newstype: 'News' }); this.selectedImages = []; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.error = '';
    const fd = new FormData();
    fd.append('title', this.form.value.title);
    fd.append('description', this.form.value.description);
    if (this.form.value.newstype) fd.append('newstype', this.form.value.newstype);
    this.selectedImages.forEach(img => fd.append('images', img));
    const obs = this.editingId ? this.api.updateNews(this.editingId, fd) : this.api.createNews(fd);
    obs.subscribe({ next: () => { this.success = 'Saved!'; this.submitting = false; this.cancel(); this.load(); setTimeout(() => this.success = '', 2500); }, error: (e) => { this.error = e.error?.message || 'Failed.'; this.submitting = false; } });
  }

  delete(id: number): void {
    if (!confirm('Delete this news?')) return;
    this.api.deleteNews(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
  }
}
