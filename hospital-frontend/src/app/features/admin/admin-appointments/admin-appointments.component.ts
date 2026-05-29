import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Appointment } from '../../../core/models/hospital.models';

@Component({ selector: 'app-admin-appointments', templateUrl: './admin-appointments.component.html' })
export class AdminAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  statuses = ['Scheduled', 'Completed', 'Canceled'];

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.loading = true; this.api.getAppointments().subscribe({ next: a => { this.appointments = a; this.loading = false; }, error: () => this.loading = false }); }

  updateStatus(id: number, status: string): void {
    this.api.updateAppointmentStatus(id, status).subscribe({ next: () => this.load(), error: () => alert('Update failed') });
  }
}
