import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-diseases',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './admin-diseases.component.html',
  styleUrl: './admin-diseases.component.css'
})
export class AdminDiseasesComponent implements OnInit {
  diseases: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;

  // Form Fields
  selectedId: number | null = null;
  name = '';
  description = '';
  selectedFiles: File[] = [];

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadDiseases();
  }

  loadDiseases() {
    this.loading = true;
    this.webClient.get<any[]>('api/diseases').subscribe({
      next: (data) => {
        this.diseases = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading diseases:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.name = '';
    this.description = '';
    this.selectedFiles = [];
    this.showModal = true;
  }

  openEditModal(d: any) {
    this.isEditMode = true;
    this.selectedId = d.diseaseid;
    this.name = d.name;
    this.description = d.description;
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

  saveDisease() {
    if (!this.name || !this.description) {
      alert('Disease name and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    
    if (this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        formData.append('images', file);
      }
    }

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<FormData, any>(`api/diseases/${this.selectedId}`, formData).subscribe({
        next: () => {
          this.loadDiseases();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating disease:', err);
          alert('Failed to update disease entry.');
        }
      });
    } else {
      this.webClient.post<FormData, any>('api/diseases', formData).subscribe({
        next: () => {
          this.loadDiseases();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating disease:', err);
          alert('Failed to create disease entry.');
        }
      });
    }
  }

  deleteDisease(id: number) {
    if (confirm('Are you sure you want to delete this disease entry?')) {
      this.webClient.delete(`api/diseases/${id}`).subscribe({
        next: () => {
          this.loadDiseases();
        },
        error: (err) => {
          console.error('Error deleting disease:', err);
          alert('Failed to delete disease entry.');
        }
      });
    }
  }
}
