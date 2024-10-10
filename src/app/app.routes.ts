import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

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
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
