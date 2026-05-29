import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSpecializationComponent } from './admin-specialization/admin-specialization.component';
import { AdminDiseaseComponent } from './admin-disease/admin-disease.component';
import { AdminFacilityComponent } from './admin-facility/admin-facility.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminTreatmentComponent } from './admin-treatment/admin-treatment.component';
import { AdminDoctorComponent } from './admin-doctor/admin-doctor.component';
import { AdminAppointmentsComponent } from './admin-appointments/admin-appointments.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdminLayoutComponent, AdminSpecializationComponent, AdminDiseaseComponent,
    AdminFacilityComponent, AdminNewsComponent, AdminTreatmentComponent,
    AdminDoctorComponent, AdminAppointmentsComponent
  ],
  imports: [SharedModule, RouterModule.forChild([
    {
      path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: 'specializations', pathMatch: 'full' },
        { path: 'specializations', component: AdminSpecializationComponent },
        { path: 'diseases', component: AdminDiseaseComponent },
        { path: 'facilities', component: AdminFacilityComponent },
        { path: 'news', component: AdminNewsComponent },
        { path: 'treatments', component: AdminTreatmentComponent },
        { path: 'doctors', component: AdminDoctorComponent },
        { path: 'appointments', component: AdminAppointmentsComponent },
      ]
    }
  ])]
})
export class AdminModule {}
