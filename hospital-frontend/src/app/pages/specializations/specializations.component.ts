import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-specializations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.css'
})
export class SpecializationsComponent implements OnInit {
  specializations: any[] = [];
  subspecializations: any[] = [];
  selectedSpec: any = null;
  loading = true;
  loadingSubs = false;
  showModal = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadSpecializations();
  }

  loadSpecializations() {
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

  selectSpecialization(spec: any) {
    this.selectedSpec = spec;
    this.loadingSubs = true;
    this.showModal = true;
    this.subspecializations = [];

    this.webClient.get<any[]>(`api/specializations/${spec.speacializationid}/subspecializations`).subscribe({
      next: (data) => {
        this.subspecializations = data;
        this.loadingSubs = false;
      },
      error: (err) => {
        console.error('Error loading subspecializations:', err);
        this.loadingSubs = false;
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedSpec = null;
  }

  /** Strip HTML tags for plain-text card preview */
  stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
