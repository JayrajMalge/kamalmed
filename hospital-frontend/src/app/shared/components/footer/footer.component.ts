import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Specialization, Facility } from '../../../core/models/hospital.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  specializations: Specialization[] = [];
  facilities: Facility[] = [];
  year = new Date().getFullYear();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSpecializations().subscribe(s => this.specializations = s.slice(0, 5));
    this.api.getFacilities().subscribe(f => this.facilities = f.slice(0, 4));
  }
}
