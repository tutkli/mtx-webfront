import { effect, inject, Injectable, signal } from '@angular/core';
import { JurisdictionApiService } from '@core/api/jurisdiction/jurisdiction-api.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';

@Injectable({ providedIn: 'root' })
export class JurisdictionService {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);
  private readonly appConfigurationService = inject(AppConfigurationService);

  private _jurisdictions = signal<Jurisdiction[]>([]);
  jurisdictions = this._jurisdictions.asReadonly();

  private _selectedJurisdiction = signal<Jurisdiction | undefined>(undefined);
  selectedJurisdiction = this._selectedJurisdiction.asReadonly();

  constructor() {
    effect(() => {
      const selectedJurisdiction = this.selectedJurisdiction();
      if (selectedJurisdiction) {
        this.appConfigurationService.getAppConfiguration(
          selectedJurisdiction.jurisdiction_id
        );
      }
    });
  }

  getJurisdictions(): void {
    this.jurisdictionApiService.getJurisdictions().subscribe(jurisdictions => {
      this._jurisdictions.set(jurisdictions);
      if (jurisdictions.length === 1) {
        this._selectedJurisdiction.set(jurisdictions[0]);
      }
    });
  }

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this._selectedJurisdiction.set(jurisdiction);
  }
}
