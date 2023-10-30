import { computed, inject, Injectable, signal } from '@angular/core';
import { JurisdictionApiService } from '@core/api/jurisdiction/jurisdiction-api.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';

export interface JurisdictionsState {
  jurisdictions: Jurisdiction[];
  selectedJurisdiction: Jurisdiction | undefined;
}

const DEFAULT_JURISDICTIONS_STATE: JurisdictionsState = {
  jurisdictions: [],
  selectedJurisdiction: undefined,
};

@Injectable({ providedIn: 'root' })
export class JurisdictionService {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);

  private _jurisdictionsState = signal(DEFAULT_JURISDICTIONS_STATE);

  public jurisdictionsState = this._jurisdictionsState.asReadonly();
  public jurisdictions = computed(() => this._jurisdictionsState().jurisdictions);
  public selectedJurisdiction = computed(
    () => this._jurisdictionsState().selectedJurisdiction
  );

  public updateJurisdiction = (jurisdiction?: Jurisdiction) =>
    this._jurisdictionsState.update(v => ({ ...v, selectedJurisdiction: jurisdiction }));

  init(): void {
    this.jurisdictionApiService.getJurisdictions().subscribe(jurisdictions => {
      const jurisdictionsState: JurisdictionsState = {
        jurisdictions,
        selectedJurisdiction: jurisdictions.length === 1 ? jurisdictions[0] : undefined,
      };

      this._jurisdictionsState.set(jurisdictionsState);
    });
  }
}
