import { computed, inject, Injectable } from '@angular/core';
import { AppConfigurationApiService } from '@core/api/app-configuration/app-configuration-api.service';
import { AppConfiguration } from '@core/models/app-configuration.model';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private readonly appConfigurationApiService = inject(AppConfigurationApiService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private appConfigsByJurisdiction$ = toObservable(
    this.jurisdictionService.jurisdictions
  ).pipe(
    switchMap(jurisdictions => {
      const observables = jurisdictions.map(jurisdiction =>
        this.appConfigurationApiService
          .getAppConfiguration(jurisdiction.jurisdiction_id)
          .pipe(catchError(() => of(undefined)))
      );

      return combineLatest(observables);
    }),
    map(result => {
      const appConfigMap: { [key in string]: AppConfiguration } = {};
      for (const appConfig of result) {
        if (appConfig) appConfigMap[appConfig.jurisdiction_id] = appConfig;
      }
      return appConfigMap;
    })
  );

  public appConfigsByJurisdiction = toSignal(this.appConfigsByJurisdiction$, {
    initialValue: {} as { [key in string]: AppConfiguration },
  });
  public selectedAppConfiguration = computed(() => {
    const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
    return selectedJurisdiction
      ? this.appConfigsByJurisdiction()[selectedJurisdiction.jurisdiction_id]
      : undefined;
  });
}
