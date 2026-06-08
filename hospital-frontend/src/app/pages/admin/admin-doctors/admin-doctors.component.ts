import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-doctors.component.html',
  styleUrl: './admin-doctors.component.css'
})
export class AdminDoctorsComponent implements OnInit {
  doctors: any[] = [];
  specializations: any[] = [];
  loading = true;
  showModal = false;
  isEditMode = false;

  // Form Fields
  selectedId: number | null = null;
  name = '';
  email = '';
  phone = '';
  schedulefrom = '';
  scheduleto = '';
  about = '';
  selectedSpecializationId: number | null = null;
  selectedFile: File | null = null;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadSpecializations();
  }

  loadDoctors() {
    this.loading = true;
    this.webClient.get<any[]>('api/doctors').subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading doctors:', err);
        this.loading = false;
      }
    });
  }

  loadSpecializations() {
    this.webClient.get<any[]>('api/specializations').subscribe({
      next: (data) => {
        this.specializations = data;
      },
      error: (err) => {
        console.error('Error loading specializations:', err);
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedId = null;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.schedulefrom = '09:00 AM';
    this.scheduleto = '05:00 PM';
    this.about = '';
    this.selectedSpecializationId = null;
    this.selectedFile = null;
    this.showModal = true;
  }

  openEditModal(doc: any) {
    this.isEditMode = true;
    this.selectedId = doc.doctorid;
    this.name = doc.name;
    this.email = doc.email;
    this.phone = doc.phone;
    this.schedulefrom = doc.schedulefrom;
    this.scheduleto = doc.scheduleto;
    this.about = doc.about;
    this.selectedSpecializationId = null; // Spec mappings are handled separately or omitted on basic updates
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

  saveDoctor() {
    if (!this.name || !this.email || !this.phone) {
      alert('Name, Email, and Phone are required.');
      return;
    }

    // Normalize phone: strip spaces, dashes, parentheses — keep digits and leading +
    const normalizedPhone = this.phone.replace(/[\s\-()]/g, '');

    const doctorData = {
      name: this.name,
      email: this.email,
      phone: normalizedPhone,
      schedulefrom: this.schedulefrom,
      scheduleto: this.scheduleto,
      about: this.about
    };

    const formData = new FormData();
    const docBlob = new Blob([JSON.stringify(doctorData)], { type: 'application/json' });
    formData.append('doctor', docBlob);
    
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    if (this.isEditMode && this.selectedId) {
      this.webClient.put<FormData, any>(`api/doctors/${this.selectedId}`, formData).subscribe({
        next: () => {
          this.loadDoctors();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating doctor:', err);
          alert('Failed to update doctor profile.');
        }
      });
    } else {
      // Create with specIds query param if selected
      let url = 'api/doctors';
      if (this.selectedSpecializationId) {
        url += `?specIds=${this.selectedSpecializationId}`;
      }
      this.webClient.post<FormData, any>(url, formData).subscribe({
        next: () => {
          this.loadDoctors();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating doctor:', err);
          alert('Failed to create doctor profile.');
        }
      });
    }
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.webClient.delete(`api/doctors/${id}`).subscribe({
        next: () => {
          this.loadDoctors();
        },
        error: (err) => {
          console.error('Error deleting doctor:', err);
          alert('Failed to delete doctor.');
        }
      });
    }
  }
}
