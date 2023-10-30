import { inject, Injectable, signal } from '@angular/core';
import { JurisdictionApiService } from '@core/api/jurisdiction/jurisdiction-api.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastComponent, ToastData } from '@shared/components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class JurisdictionService {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);
  private readonly hotToastService = inject(HotToastService);

  private _jurisdictions = signal<Jurisdiction[]>([]);
  private _selectedJurisdiction = signal<Jurisdiction | undefined>(undefined);

  public jurisdictions = this._jurisdictions.asReadonly();
  public selectedJurisdiction = this._selectedJurisdiction.asReadonly();

  public setJurisdictions = (jurisdictions: Jurisdiction[]) =>
    this._jurisdictions.set(jurisdictions);
  public updateJurisdiction = (jurisdiction?: Jurisdiction) => {
    if (this._selectedJurisdiction()?.id !== jurisdiction?.id)
      this._selectedJurisdiction.set(jurisdiction);
  };

  init(): void {
    this.jurisdictionApiService.getJurisdictions().subscribe(jurisdictions => {
      this.setJurisdictions(jurisdictions);
      this.updateJurisdiction(jurisdictions.length === 1 ? jurisdictions[0] : undefined);
    });
  }

  showJurisdictionErrorToast(): void {
    this.hotToastService.show<ToastData>(ToastComponent, {
      data: {
        titleRef: 'error.jurisdiction.title',
        descriptionRef: 'error.jurisdiction.description',
        type: 'warn',
        dismissible: true,
      },
    });
  }
}
