import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);
  
  // Check user role from localStorage
  const role = localStorage.getItem('kamalmed_role');
  const token = localStorage.getItem('kamalmed_token');
  
  if (token && role === 'Admin') {
    return true;
  }
  
  // Redirect to login if not authorized
  router.navigate(['/login']);
  return false;
};
