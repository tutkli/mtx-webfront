import { Routes } from '@angular/router';
import { TestingComponent } from '@pages/root/pages/testing/testing.component';

export const rootRoutes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.routes').then(m => m.listRoutes),
  },
  {
    path: 'testing',
    component: TestingComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
