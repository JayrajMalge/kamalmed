import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-treatments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent implements OnInit {
  treatments: any[] = [];
  filteredTreatments: any[] = [];
  selectedTreatment: any = null;
  loading = true;
  showModal = false;
  maxCostFilter = 100000;
  costFilterActive = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadTreatments();
  }

  loadTreatments() {
    this.webClient.get<any[]>('api/treatments').subscribe({
      next: (data) => {
        this.treatments = data;
        this.filteredTreatments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading treatments:', err);
        this.loading = false;
      }
    });
  }

  filterByCost() {
    if (this.costFilterActive) {
      this.filteredTreatments = this.treatments.filter(t => t.cost <= this.maxCostFilter);
    } else {
      this.filteredTreatments = this.treatments;
    }
  }

  toggleCostFilter() {
    this.costFilterActive = !this.costFilterActive;
    this.filterByCost();
  }

  selectTreatment(t: any) {
    this.selectedTreatment = t;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedTreatment = null;
  }
}
