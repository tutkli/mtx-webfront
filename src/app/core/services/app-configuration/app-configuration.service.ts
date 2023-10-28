import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AppConfigurationApiService } from '@core/api/app-configuration/app-configuration-api.service';
import { AppConfiguration } from '@core/models/app-configuration.model';
import { catchError, combineLatest, of } from 'rxjs';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private readonly appConfigurationApiService = inject(AppConfigurationApiService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private _appConfigurationsByJurisdiction = signal<Map<string, AppConfiguration>>(
    new Map()
  );
  public appConfigurationsByJurisdiction =
    this._appConfigurationsByJurisdiction.asReadonly();

  public selectedAppConfiguration = computed(() => {
    const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
    return selectedJurisdiction
      ? this._appConfigurationsByJurisdiction().get(selectedJurisdiction.jurisdiction_id)
      : undefined;
  });

  constructor() {
    effect(() => {
      this.getAppConfigurations(
        this.jurisdictionService
          .jurisdictions()
          .map(jurisdiction => jurisdiction.jurisdiction_id)
      );
    });
  }

  getAppConfigurations(jurisdictionIds: string[]): void {
    combineLatest(
      jurisdictionIds.map(jurisdictionId =>
        this.appConfigurationApiService
          .getAppConfiguration(jurisdictionId)
          .pipe(catchError(() => of(undefined)))
      )
    ).subscribe(result => {
      const appConfigMap = new Map<string, AppConfiguration>();
      for (const appConfig of result) {
        if (appConfig) appConfigMap.set(appConfig.jurisdiction_id, appConfig);
      }
      this._appConfigurationsByJurisdiction.set(appConfigMap);
    });
  }
}
