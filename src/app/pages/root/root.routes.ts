import { Routes } from '@angular/router';
import { JurisdictionListComponent } from '@pages/root/pages/jurisdiction-list/jurisdiction-list.component';

export const rootRoutes: Routes = [
  {
    path: 'list',
    component: JurisdictionListComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];