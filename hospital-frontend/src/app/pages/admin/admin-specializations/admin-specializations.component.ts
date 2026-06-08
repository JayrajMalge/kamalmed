import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-specializations',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './admin-specializations.component.html',
  styleUrl: './admin-specializations.component.css'
})
export class AdminSpecializationsComponent implements OnInit {
  specializations: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;
  
  // Specialization Form
  selectedId: number | null = null;
  fieldname = '';
  description = '';
  selectedFile: File | null = null;

  // Subspecialization Mode
  activeSpecForSubs: any = null;
  subspecializations: any[] = [];
  showSubModal = false;
  subName = '';
  subDescription = '';
  subSelectedFile: File | null = null;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadSpecializations();
  }

  loadSpecializations() {
    this.loading = true;
    this.webClient.get<any[]>('api/specializations').subscribe({
      next: (data) => {
        this.specializations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading specializations:', err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.fieldname = '';
    this.description = '';
    this.selectedFile = null;
    this.showModal = true;
  }

  openEditModal(spec: any) {
    this.isEditMode = true;
    this.selectedId = spec.speacializationid;
    this.fieldname = spec.fieldname;
    this.description = spec.description;
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveSpecialization() {
    if (!this.fieldname || !this.description) {
      alert('Field name and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('fieldname', this.fieldname);
    formData.append('description', this.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<FormData, any>(`api/specializations/${this.selectedId}`, formData).subscribe({
        next: () => {
          this.loadSpecializations();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating specialization:', err);
          alert('Failed to update specialization.');
        }
      });
    } else {
      this.webClient.post<FormData, any>('api/specializations', formData).subscribe({
        next: () => {
          this.loadSpecializations();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating specialization:', err);
          alert('Failed to create specialization.');
        }
      });
    }
  }

  deleteSpecialization(id: number) {
    if (confirm('Are you sure you want to delete this specialization? All subspecializations will be deleted too.')) {
      this.webClient.delete(`api/specializations/${id}`).subscribe({
        next: () => {
          this.loadSpecializations();
        },
        error: (err) => {
          console.error('Error deleting specialization:', err);
          alert('Failed to delete specialization.');
        }
      });
    }
  }

  // Subspecializations Management
  manageSubs(spec: any) {
    this.activeSpecForSubs = spec;
    this.loadSubspecializations();
  }

  loadSubspecializations() {
    this.webClient.get<any[]>(`api/specializations/${this.activeSpecForSubs.speacializationid}/subspecializations`).subscribe({
      next: (data) => {
        this.subspecializations = data;
      },
      error: (err) => {
        console.error('Error loading subspecializations:', err);
      }
    });
  }

  closeSubsView() {
    this.activeSpecForSubs = null;
    this.subspecializations = [];
  }

  openAddSubModal() {
    this.subName = '';
    this.subDescription = '';
    this.subSelectedFile = null;
    this.showSubModal = true;
  }

  closeSubModal() {
    this.showSubModal = false;
  }

  onSubFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.subSelectedFile = event.target.files[0];
    }
  }

  saveSubspecialization() {
    if (!this.subName || !this.subDescription) {
      alert('Subspecialty name and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.subName);
    formData.append('description', this.subDescription);
    if (this.subSelectedFile) {
      formData.append('image', this.subSelectedFile);
    }

    this.webClient.post<FormData, any>(
      `api/specializations/${this.activeSpecForSubs.speacializationid}/subspecializations`,
      formData
    ).subscribe({
      next: () => {
        this.loadSubspecializations();
        this.closeSubModal();
      },
      error: (err) => {
        console.error('Error creating subspecialization:', err);
        alert('Failed to add subspecialization.');
      }
    });
  }
}
