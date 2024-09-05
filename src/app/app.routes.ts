import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./components/services/services.component').then(
        (c) => c.ServicesComponent
      ),
    children: [
      {
        path: 'cashwave',
        loadComponent: () =>
          import('./components/services/cashwave/cashwave.component').then(
            (c) => c.CashwaveComponent
          ),
      },
      
    ],
  },
];
