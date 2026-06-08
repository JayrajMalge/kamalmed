import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-facilities',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './admin-facilities.component.html',
  styleUrl: './admin-facilities.component.css'
})
export class AdminFacilitiesComponent implements OnInit {
  facilities: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;

  // Form Fields
  selectedId: number | null = null;
  facilityname = '';
  description = '';
  facilitytype = '';
  availability = 'yes';
  selectedFiles: File[] = [];

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadFacilities();
  }

  loadFacilities() {
    this.loading = true;
    this.webClient.get<any[]>('api/facilities').subscribe({
      next: (data) => {
        this.facilities = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading facilities:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.facilityname = '';
    this.description = '';
    this.facilitytype = '';
    this.availability = 'yes';
    this.selectedFiles = [];
    this.showModal = true;
  }

  openEditModal(fac: any) {
    this.isEditMode = true;
    this.selectedId = fac.facilitesid;
    this.facilityname = fac.facilityname;
    this.description = fac.description;
    this.facilitytype = fac.facilitytype || '';
    this.availability = fac.availability || 'yes';
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

  saveFacility() {
    if (!this.facilityname || !this.description) {
      alert('Facility name and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('facilityname', this.facilityname);
    formData.append('description', this.description);
    formData.append('facilitytype', this.facilitytype);
    formData.append('availability', this.availability);
    
    // Add multiple files
    if (this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        formData.append('images', file);
      }
    }

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<FormData, any>(`api/facilities/${this.selectedId}`, formData).subscribe({
        next: () => {
          this.loadFacilities();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating facility:', err);
          alert('Failed to update facility.');
        }
      });
    } else {
      this.webClient.post<FormData, any>('api/facilities', formData).subscribe({
        next: () => {
          this.loadFacilities();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating facility:', err);
          alert('Failed to create facility.');
        }
      });
    }
  }

  deleteFacility(id: number) {
    if (confirm('Are you sure you want to delete this facility?')) {
      this.webClient.delete(`api/facilities/${id}`).subscribe({
        next: () => {
          this.loadFacilities();
        },
        error: (err) => {
          console.error('Error deleting facility:', err);
          alert('Failed to delete facility.');
        }
      });
    }
  }
}
