import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const redirectGuard: CanActivateFn = (route, state) => {
  const loginData = localStorage.getItem('loginData');
  const router = inject(Router);

  if (loginData) {
    router.navigate(['/dashboard']); // Redirect to the dashboard if already logged in
    return false;
  }

  return true; // Allow access to login/signup route if not logged in
};
