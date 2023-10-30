import { inject, Injectable, signal } from '@angular/core';
import { JurisdictionApiService } from '@core/api/jurisdiction/jurisdiction-api.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';

@Injectable({ providedIn: 'root' })
export class JurisdictionService {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);

  private _jurisdictions = signal<Jurisdiction[]>([]);
  private _selectedJurisdiction = signal<Jurisdiction | undefined>(undefined);

  public jurisdictions = this._jurisdictions.asReadonly();
  public selectedJurisdiction = this._selectedJurisdiction.asReadonly();

  public setJurisdictions = (jurisdictions: Jurisdiction[]) =>
    this._jurisdictions.set(jurisdictions);
  public updateJurisdiction = (jurisdiction?: Jurisdiction) =>
    this._selectedJurisdiction.set(jurisdiction);

  init(): void {
    this.jurisdictionApiService.getJurisdictions().subscribe(jurisdictions => {
      this.setJurisdictions(jurisdictions);
      this.updateJurisdiction(jurisdictions.length === 1 ? jurisdictions[0] : undefined);
    });
  }
}
