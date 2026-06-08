import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent implements OnInit {
  facilities: any[] = [];
  selectedFacility: any = null;
  activeImageIndex = 0;
  loading = true;
  showModal = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadFacilities();
  }

  loadFacilities() {
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

  selectFacility(fac: any) {
    this.selectedFacility = fac;
    this.activeImageIndex = 0;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedFacility = null;
  }

  nextImage() {
    if (this.selectedFacility && this.selectedFacility.images) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.selectedFacility.images.length;
    }
  }

  prevImage() {
    if (this.selectedFacility && this.selectedFacility.images) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.selectedFacility.images.length) % this.selectedFacility.images.length;
    }
  }
}
