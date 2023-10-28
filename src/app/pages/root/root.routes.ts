import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.routes').then(m => m.listRoutes),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
