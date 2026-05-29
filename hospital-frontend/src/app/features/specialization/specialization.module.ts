import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecializationListComponent } from './specialization-list/specialization-list.component';
import { SpecializationDetailComponent } from './specialization-detail/specialization-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SpecializationListComponent, SpecializationDetailComponent],
  imports: [SharedModule, RouterModule.forChild([
    { path: '', component: SpecializationListComponent },
    { path: ':id', component: SpecializationDetailComponent }
  ])]
})
export class SpecializationModule {}
