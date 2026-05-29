import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialization, SubSpecialization, Disease, Facility, News, Treatment, Doctor, Appointment } from '../models/hospital.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Specializations
  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>('/api/specializations');
  }
  getSpecialization(id: number): Observable<Specialization> {
    return this.http.get<Specialization>(`/api/specializations/${id}`);
  }
  getSubSpecializations(specId: number): Observable<SubSpecialization[]> {
    return this.http.get<SubSpecialization[]>(`/api/specializations/${specId}/subspecializations`);
  }
  createSpecialization(fd: FormData): Observable<Specialization> {
    return this.http.post<Specialization>('/api/specializations', fd);
  }
  updateSpecialization(id: number, fd: FormData): Observable<Specialization> {
    return this.http.put<Specialization>(`/api/specializations/${id}`, fd);
  }
  deleteSpecialization(id: number): Observable<void> {
    return this.http.delete<void>(`/api/specializations/${id}`);
  }
  addSubSpecialization(specId: number, fd: FormData): Observable<SubSpecialization> {
    return this.http.post<SubSpecialization>(`/api/specializations/${specId}/subspecializations`, fd);
  }

  // Diseases
  getDiseases(): Observable<Disease[]> {
    return this.http.get<Disease[]>('/api/diseases');
  }
  getDisease(id: number): Observable<Disease> {
    return this.http.get<Disease>(`/api/diseases/${id}`);
  }
  createDisease(fd: FormData): Observable<Disease> {
    return this.http.post<Disease>('/api/diseases', fd);
  }
  updateDisease(id: number, fd: FormData): Observable<Disease> {
    return this.http.put<Disease>(`/api/diseases/${id}`, fd);
  }
  deleteDisease(id: number): Observable<void> {
    return this.http.delete<void>(`/api/diseases/${id}`);
  }

  // Facilities
  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>('/api/facilities');
  }
  getFacility(id: number): Observable<Facility> {
    return this.http.get<Facility>(`/api/facilities/${id}`);
  }
  createFacility(fd: FormData): Observable<Facility> {
    return this.http.post<Facility>('/api/facilities', fd);
  }
  updateFacility(id: number, fd: FormData): Observable<Facility> {
    return this.http.put<Facility>(`/api/facilities/${id}`, fd);
  }
  deleteFacility(id: number): Observable<void> {
    return this.http.delete<void>(`/api/facilities/${id}`);
  }

  // News
  getNews(type?: string): Observable<News[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<News[]>('/api/news', { params });
  }
  getNewsItem(id: number): Observable<News> {
    return this.http.get<News>(`/api/news/${id}`);
  }
  createNews(fd: FormData): Observable<News> {
    return this.http.post<News>('/api/news', fd);
  }
  updateNews(id: number, fd: FormData): Observable<News> {
    return this.http.put<News>(`/api/news/${id}`, fd);
  }
  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`/api/news/${id}`);
  }

  // Treatments
  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>('/api/treatments');
  }
  getTreatment(id: number): Observable<Treatment> {
    return this.http.get<Treatment>(`/api/treatments/${id}`);
  }
  createTreatment(data: Partial<Treatment>): Observable<Treatment> {
    return this.http.post<Treatment>('/api/treatments', data);
  }
  updateTreatment(id: number, data: Partial<Treatment>): Observable<Treatment> {
    return this.http.put<Treatment>(`/api/treatments/${id}`, data);
  }
  deleteTreatment(id: number): Observable<void> {
    return this.http.delete<void>(`/api/treatments/${id}`);
  }

  // Doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('/api/doctors');
  }
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`/api/doctors/${id}`);
  }
  createDoctor(fd: FormData): Observable<Doctor> {
    return this.http.post<Doctor>('/api/doctors', fd);
  }
  updateDoctor(id: number, fd: FormData): Observable<Doctor> {
    return this.http.put<Doctor>(`/api/doctors/${id}`, fd);
  }
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`/api/doctors/${id}`);
  }

  // Appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>('/api/appointments');
  }
  bookAppointment(data: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>('/api/appointments', data);
  }
  updateAppointmentStatus(id: number, status: string): Observable<Appointment> {
    return this.http.put<Appointment>(`/api/appointments/${id}/status`, null, { params: { status } });
  }

  getImageUrl(path: string): string {
    return path ? `/uploads/${path}` : '/assets/placeholder.jpg';
  }
}
