import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diseases.component.html',
  styleUrl: './diseases.component.css'
})
export class DiseasesComponent implements OnInit {
  diseases: any[] = [];
  filteredDiseases: any[] = [];
  selectedDisease: any = null;
  searchQuery = '';
  loading = true;
  showModal = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadDiseases();
  }

  loadDiseases() {
    this.webClient.get<any[]>('api/diseases').subscribe({
      next: (data) => {
        this.diseases = data;
        this.filteredDiseases = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading diseases:', err);
        this.loading = false;
      }
    });
  }

  filterDiseases() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query === '') {
      this.filteredDiseases = this.diseases;
    } else {
      this.filteredDiseases = this.diseases.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.description.toLowerCase().includes(query)
      );
    }
  }

  selectDisease(d: any) {
    this.selectedDisease = d;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedDisease = null;
  }
}
