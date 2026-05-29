import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacilityListComponent } from './facility-list/facility-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FacilityListComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: FacilityListComponent }])]
})
export class FacilityModule {}
