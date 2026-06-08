import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-treatments',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './admin-treatments.component.html',
  styleUrl: './admin-treatments.component.css'
})
export class AdminTreatmentsComponent implements OnInit {
  treatments: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;

  // Form Fields
  selectedId: number | null = null;
  title = '';
  description = '';
  cost: number | null = null;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadTreatments();
  }

  loadTreatments() {
    this.loading = true;
    this.webClient.get<any[]>('api/treatments').subscribe({
      next: (data) => {
        this.treatments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading treatments:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.title = '';
    this.description = '';
    this.cost = null;
    this.showModal = true;
  }

  openEditModal(t: any) {
    this.isEditMode = true;
    this.selectedId = t.treatmentid;
    this.title = t.title;
    this.description = t.description;
    this.cost = t.cost;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveTreatment() {
    if (!this.title || !this.description) {
      alert('Title and description are required.');
      return;
    }

    const payload = {
      title: this.title,
      description: this.description,
      cost: this.cost
    };

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<any, any>(`api/treatments/${this.selectedId}`, payload).subscribe({
        next: () => {
          this.loadTreatments();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating treatment:', err);
          alert('Failed to update treatment.');
        }
      });
    } else {
      this.webClient.post<any, any>('api/treatments', payload).subscribe({
        next: () => {
          this.loadTreatments();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating treatment:', err);
          alert('Failed to create treatment.');
        }
      });
    }
  }

  deleteTreatment(id: number) {
    if (confirm('Are you sure you want to delete this treatment?')) {
      this.webClient.delete(`api/treatments/${id}`).subscribe({
        next: () => {
          this.loadTreatments();
        },
        error: (err) => {
          console.error('Error deleting treatment:', err);
          alert('Failed to delete treatment.');
        }
      });
    }
  }
}
