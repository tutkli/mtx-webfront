import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { iif, mergeMap, of } from 'rxjs';
import { requestsListGuard } from '@core/guards/requests-list/requests-list.guard';

const redirectTo = () => {
  const router = inject(Router);
  const jurisdictionService = inject(JurisdictionService);

  return toObservable(jurisdictionService.selectedJurisdiction).pipe(
    mergeMap(selectedJurisdiction =>
      iif(
        () => selectedJurisdiction === undefined,
        of(router.createUrlTree(['list', 'jurisdictions'])),
        of(router.createUrlTree(['list', 'requests']))
      )
    )
  );
};

export const listRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [],
    canActivate: [() => redirectTo()],
  },
  {
    path: 'jurisdictions',
    loadComponent: () => import('./pages/jurisdiction-list/jurisdiction-list.component'),
  },
  {
    path: 'requests',
    loadComponent: () => import('./pages/requests-list/requests-list.component'),
    canActivate: [requestsListGuard],
  },
];
