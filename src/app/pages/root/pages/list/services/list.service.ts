import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Router } from '@angular/router';
import { RequestApiService } from '@core/api/request/request-api.service';
import { combineLatest } from 'rxjs';
import { RequestService } from '@core/services/request/request.service';

@Injectable({ providedIn: 'root' })
export class ListService {
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly requestService = inject(RequestService);
  private readonly requestApiService = inject(RequestApiService);
  private readonly router = inject(Router);

  private _requestCountsByJurisdiction = signal<Map<string, number>>(new Map());
  private _requestCountLastDaysByJurisdiction = signal<Map<string, number>>(new Map());

  public requestCountsByJurisdiction = this._requestCountsByJurisdiction.asReadonly();
  public requestCountLastDaysByJurisdiction =
    this._requestCountLastDaysByJurisdiction.asReadonly();
  public totalRequestCountLastDays = computed(() => {
    return Array.from(this.requestCountLastDaysByJurisdiction().values()).reduce(
      (a, b) => a + b,
      0
    );
  });
  public selectedJurisdictionCount = computed(() => {
    const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
    if (selectedJurisdiction) {
      return (
        this._requestCountsByJurisdiction().get(selectedJurisdiction.jurisdiction_id) ?? 0
      );
    }
    return 0;
  });
  public selectedJurisdictionLastDays = computed(() => {
    const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
    if (selectedJurisdiction) {
      return (
        this._requestCountLastDaysByJurisdiction().get(
          selectedJurisdiction.jurisdiction_id
        ) ?? 0
      );
    }
    return 0;
  });

  private redirectToRequestsList = effect(() => {
    if (this.jurisdictionService.selectedJurisdiction()) {
      this.router.navigate(['list', 'requests']).then();
    }
  });

  private redirectToJurisdictionList = effect(() => {
    if (!this.jurisdictionService.selectedJurisdiction()) {
      this.router.navigate(['list', 'jurisdictions']).then();
    }
  });

  private redirectToRequestDetail = effect(() => {
    const selectedRequest = this.requestService.selectedRequest();
    if (selectedRequest) {
      this.router.navigate(['list', 'request', selectedRequest.token]).then();
    }
  });

  private loadRequestCounts = effect(() => {
    this.getRequestCountsByJurisdiction(
      this.jurisdictionService
        .jurisdictions()
        .map(jurisdiction => jurisdiction.jurisdiction_id)
    );
  });

  private loadRequestCountLastDays = effect(() => {
    this.getRequestCountLastDaysByJurisdiction(
      this.jurisdictionService
        .jurisdictions()
        .map(jurisdiction => jurisdiction.jurisdiction_id)
    );
  });

  private getRequestCountsByJurisdiction(jurisdictionIds: string[]): void {
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

  private getRequestCountLastDaysByJurisdiction(jurisdictionIds: string[]): void {
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
