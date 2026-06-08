import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../../services/web-client.service';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appointments.component.html',
  styleUrl: './admin-appointments.component.css'
})
export class AdminAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = true;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;
    this.webClient.get<any[]>('api/appointments').subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.loading = false;
      }
    });
  }

  updateStatus(id: number, status: string) {
    this.webClient.put<any, any>(`api/appointments/${id}/status?status=${status}`, {}).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status.');
      }
    });
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to cancel and delete this appointment?')) {
      this.webClient.delete(`api/appointments/${id}`).subscribe({
        next: () => {
          this.loadAppointments();
        },
        error: (err) => {
          console.error('Error deleting appointment:', err);
          alert('Failed to delete appointment.');
        }
      });
    }
  }
}
