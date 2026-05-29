import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DiseaseListComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: DiseaseListComponent }])]
})
export class DiseaseModule {}
