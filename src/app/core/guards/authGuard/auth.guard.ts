import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginData = localStorage.getItem('loginData');
  const router = inject(Router);

  if (!loginData) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }

  return true; // Allow access to protected route
};
