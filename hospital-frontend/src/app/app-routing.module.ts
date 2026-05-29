import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'specializations', loadChildren: () => import('./features/specialization/specialization.module').then(m => m.SpecializationModule) },
  { path: 'facilities', loadChildren: () => import('./features/facility/facility.module').then(m => m.FacilityModule) },
  { path: 'diseases', loadChildren: () => import('./features/disease/disease.module').then(m => m.DiseaseModule) },
  { path: 'news', loadChildren: () => import('./features/news/news.module').then(m => m.NewsModule) },
  { path: 'treatments', loadChildren: () => import('./features/treatment/treatment.module').then(m => m.TreatmentModule) },
  { path: 'doctors', loadChildren: () => import('./features/doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
