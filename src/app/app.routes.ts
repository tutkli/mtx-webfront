import { Routes } from '@angular/router';
import { rootRoutes } from '@pages/root/root.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/root/root-layout.component'),
    children: rootRoutes,
  },
];
