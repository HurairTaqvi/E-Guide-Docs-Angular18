import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './core/guards/authGuard/auth.guard'; // Import the guard
import { redirectGuard } from './core/guards/redirectGuard/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'service',
    loadComponent: () =>
      import('./components/services/services.component').then(
        (c) => c.ServicesComponent
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectGuard], // Prevent access if already logged in
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [redirectGuard], // Prevent access if already logged in
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Only accessible if logged in
  },
];
