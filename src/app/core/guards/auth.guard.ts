import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const loginData = localStorage.getItem('loginData');
  const router = inject(Router);
  // router.navigate(['/dashboard']); // Redirect to the dashboard

  // if (loginData) {
  //   return false; // Prevent access to the login route
  // }
  return true; // Allow access to the login route
};
