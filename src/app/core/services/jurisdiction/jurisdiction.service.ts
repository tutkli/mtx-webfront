import { inject, Injectable, signal } from '@angular/core';
import { JurisdictionApiService } from '@core/api/jurisdiction/jurisdiction-api.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JurisdictionService {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);

  private _jurisdictions = signal<Jurisdiction[]>([]);
  jurisdictions = this._jurisdictions.asReadonly();

  private _selectedJurisdiction = signal<Jurisdiction | undefined>(undefined);
  selectedJurisdiction = this._selectedJurisdiction.asReadonly();

  getJurisdictions(): void {
    this.jurisdictionApiService
      .getJurisdictions()
      .pipe(
        tap(jurisdictions => {
          if (jurisdictions.length === 1)
            this._selectedJurisdiction.set(jurisdictions[0]);
        })
      )
      .subscribe(jurisdictions => {
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
