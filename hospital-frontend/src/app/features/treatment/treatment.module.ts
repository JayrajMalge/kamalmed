import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TreatmentListComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: TreatmentListComponent }])]
})
export class TreatmentModule {}
