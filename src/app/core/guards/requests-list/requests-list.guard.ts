import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

export const requestsListGuard: CanActivateFn = () => {
  const jurisdictionService = inject(JurisdictionService);
  const router = inject(Router);

  if (jurisdictionService.selectedJurisdiction()) {
    return true;
  }

  return router.createUrlTree(['list', 'jurisdictions']);
};
