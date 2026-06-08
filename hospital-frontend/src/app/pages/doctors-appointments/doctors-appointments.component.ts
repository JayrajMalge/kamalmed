import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-doctors-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-appointments.component.html',
  styleUrl: './doctors-appointments.component.css'
})
export class DoctorsAppointmentsComponent implements OnInit {
  doctors: any[] = [];
  loading = true;
  bookingDoctor: any = null;
  appointmentDate = '';
  appointmentTime = '';
  mobileNo = '';
  bookingSuccess = false;
  bookingError = '';
  isLoggedIn = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadDoctors();
    this.checkLoginStatus();
  }

  loadDoctors() {
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

  checkLoginStatus() {
    const token = localStorage.getItem('kamalmed_token');
    this.isLoggedIn = !!token;
  }

  openBookingModal(doctor: any) {
    this.bookingDoctor = doctor;
    this.bookingSuccess = false;
    this.bookingError = '';
    this.mobileNo = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
  }

  closeBookingModal() {
    this.bookingDoctor = null;
  }

  bookAppointment() {
    if (!this.isLoggedIn) {
      this.bookingError = 'You must be logged in to book an appointment.';
      return;
    }

    if (!this.appointmentDate || !this.appointmentTime || !this.mobileNo) {
      this.bookingError = 'Please fill out all fields.';
      return;
    }

    if (!/^[0-9]{10}$/.test(this.mobileNo)) {
      this.bookingError = 'Mobile number must be exactly 10 digits.';
      return;
    }

    const dateTimeStr = `${this.appointmentDate}T${this.appointmentTime}:00`;

    const appointmentPayload = {
      doctor: {
        doctorid: this.bookingDoctor.doctorid
      },
      appointmentdate: dateTimeStr,
      mobileno: this.mobileNo
    };

    this.webClient.post<any, any>('api/appointments', appointmentPayload).subscribe({
      next: () => {
        this.bookingSuccess = true;
        this.bookingError = '';
        setTimeout(() => {
          this.closeBookingModal();
        }, 2000);
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        this.bookingError = 'Failed to book appointment. Please try again.';
      }
    });
  }
}
