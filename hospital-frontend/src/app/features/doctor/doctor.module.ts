import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DoctorListComponent, DoctorDetailComponent],
  imports: [SharedModule, RouterModule.forChild([
    { path: '', component: DoctorListComponent },
    { path: ':id', component: DoctorDetailComponent }
  ])]
})
export class DoctorModule {}
