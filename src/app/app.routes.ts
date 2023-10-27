import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layout/root/root-layout.component'),
    loadChildren: () =>
      import('@layout/root/root.routes').then(m => m.rootRoutes),
  },
];
