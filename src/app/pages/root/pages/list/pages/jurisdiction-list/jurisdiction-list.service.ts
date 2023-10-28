import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Router } from '@angular/router';
import { RequestApiService } from '@core/api/request/request-api.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JurisdictionListService {
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly requestApiService = inject(RequestApiService);
  private readonly router = inject(Router);

  private _requestCountsByJurisdiction = signal<Map<string, number>>(new Map());
  public requestCountsByJurisdiction = this._requestCountsByJurisdiction.asReadonly();

  private _requestCountLastDaysByJurisdiction = signal<Map<string, number>>(new Map());
  public requestCountLastDaysByJurisdiction =
    this._requestCountLastDaysByJurisdiction.asReadonly();

  public totalRequestCountLastDays = computed(() => {
    return Array.from(this.requestCountLastDaysByJurisdiction().values()).reduce(
      (a, b) => a + b,
      0
    );
  });

  constructor() {
    effect(() => {
      if (this.jurisdictionService.selectedJurisdiction()) {
        this.router.navigate(['list', 'requests']).then();
      }
    });

    effect(() => {
      this.getRequestCountsByJurisdiction(
        this.jurisdictionService
          .jurisdictions()
          .map(jurisdiction => jurisdiction.jurisdiction_id)
      );
    });

    effect(() => {
      this.getRequestCountLastDaysByJurisdiction(
        this.jurisdictionService
          .jurisdictions()
          .map(jurisdiction => jurisdiction.jurisdiction_id)
      );
    });
  }

  getRequestCountsByJurisdiction(jurisdictionIds: string[]): void {
    combineLatest(
      jurisdictionIds.map(jurisdictionId =>
        this.requestApiService.getRequestCount([jurisdictionId])
      )
    ).subscribe(result => {
      const requestCountMap = new Map<string, number>();
      for (const [i, count] of result.entries()) {
        requestCountMap.set(jurisdictionIds[i], count);
      }
      this._requestCountsByJurisdiction.set(requestCountMap);
    });
  }

  getRequestCountLastDaysByJurisdiction(jurisdictionIds: string[]): void {
    combineLatest(
      jurisdictionIds.map(jurisdictionId =>
        this.requestApiService.getRequestCountLastDays([jurisdictionId])
      )
    ).subscribe(result => {
      const requestCountMap = new Map<string, number>();
      for (const [i, countLastDays] of result.entries()) {
        requestCountMap.set(jurisdictionIds[i], countLastDays.count);
      }
      this._requestCountLastDaysByJurisdiction.set(requestCountMap);
    });
  }
}
