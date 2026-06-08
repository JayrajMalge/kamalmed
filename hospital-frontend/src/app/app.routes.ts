import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'specializations',
    loadComponent: () => import('./pages/specializations/specializations.component').then(m => m.SpecializationsComponent)
  },
  {
    path: 'facilities',
    loadComponent: () => import('./pages/facilities/facilities.component').then(m => m.FacilitiesComponent)
  },
  {
    path: 'news-blogs',
    loadComponent: () => import('./pages/news-blogs/news-blogs.component').then(m => m.NewsBlogsComponent)
  },
  {
    path: 'treatments',
    loadComponent: () => import('./pages/treatments/treatments.component').then(m => m.TreatmentsComponent)
  },
  {
    path: 'diseases',
    loadComponent: () => import('./pages/diseases/diseases.component').then(m => m.DiseasesComponent)
  },
  {
    path: 'doctors-appointments',
    loadComponent: () => import('./pages/doctors-appointments/doctors-appointments.component').then(m => m.DoctorsAppointmentsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },

  // Admin Routes (Protected by adminGuard)
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'specializations',
        pathMatch: 'full'
      },
      {
        path: 'specializations',
        loadComponent: () => import('./pages/admin/admin-specializations/admin-specializations.component').then(m => m.AdminSpecializationsComponent)
      },
      {
        path: 'facilities',
        loadComponent: () => import('./pages/admin/admin-facilities/admin-facilities.component').then(m => m.AdminFacilitiesComponent)
      },
      {
        path: 'news-blogs',
        loadComponent: () => import('./pages/admin/admin-news-blogs/admin-news-blogs.component').then(m => m.AdminNewsBlogsComponent)
      },
      {
        path: 'treatments',
        loadComponent: () => import('./pages/admin/admin-treatments/admin-treatments.component').then(m => m.AdminTreatmentsComponent)
      },
      {
        path: 'diseases',
        loadComponent: () => import('./pages/admin/admin-diseases/admin-diseases.component').then(m => m.AdminDiseasesComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./pages/admin/admin-appointments/admin-appointments.component').then(m => m.AdminAppointmentsComponent)
      },
      {
        path: 'doctors',
        loadComponent: () => import('./pages/admin/admin-doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent)
      }
    ]
  },

  // Catch-all Redirect
  {
    path: '**',
    redirectTo: ''
  }
];
