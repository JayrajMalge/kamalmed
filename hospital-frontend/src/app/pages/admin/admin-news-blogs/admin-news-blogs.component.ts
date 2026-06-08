import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-news-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './admin-news-blogs.component.html',
  styleUrl: './admin-news-blogs.component.css'
})
export class AdminNewsBlogsComponent implements OnInit {
  items: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;

  // Form Fields
  selectedId: number | null = null;
  title = '';
  description = '';
  newstype = 'news';
  selectedFiles: File[] = [];

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.webClient.get<any[]>('api/news').subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading news/blogs:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.title = '';
    this.description = '';
    this.newstype = 'news';
    this.selectedFiles = [];
    this.showModal = true;
  }

  openEditModal(item: any) {
    this.isEditMode = true;
    this.selectedId = item.newsid;
    this.title = item.title;
    this.description = item.description;
    this.newstype = item.newstype || 'news';
    this.selectedFiles = [];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFilesSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  saveItem() {
    if (!this.title || !this.description) {
      alert('Title and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('newstype', this.newstype);
    
    if (this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        formData.append('images', file);
      }
    }

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<FormData, any>(`api/news/${this.selectedId}`, formData).subscribe({
        next: () => {
          this.loadItems();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating news/blog:', err);
          alert('Failed to update article.');
        }
      });
    } else {
      this.webClient.post<FormData, any>('api/news', formData).subscribe({
        next: () => {
          this.loadItems();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating news/blog:', err);
          alert('Failed to create article.');
        }
      });
    }
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this news/blog article?')) {
      this.webClient.delete(`api/news/${id}`).subscribe({
        next: () => {
          this.loadItems();
        },
        error: (err) => {
          console.error('Error deleting news/blog:', err);
          alert('Failed to delete article.');
        }
      });
    }
  }
}
