import { Routes } from '@angular/router';
import { TestingComponent } from '@pages/root/pages/testing/testing.component';
import { listRoutes } from '@pages/root/pages/list/list.routes';

export const rootRoutes: Routes = [
  {
    path: 'list',
    children: listRoutes,
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
