import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/root/root-layout.component'),
    loadChildren: () =>
      import('@pages/root/root.routes').then(m => m.rootRoutes),
  },
];
