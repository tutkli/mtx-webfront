import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Request } from '@core/models/request.model';
import { RequestApiService } from '@core/api/request/request-api.service';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

export interface RequestListState {
  page: number;
  limit: number;
  loading: boolean;
}

const defaultState: RequestListState = {
  page: 1,
  limit: 30,
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly requestApiService = inject(RequestApiService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private _requestListState = signal<RequestListState>(defaultState);
  public requestListState = this._requestListState.asReadonly();

  public loading = computed(() => this.requestListState().loading);

  private _requests = signal<Request[]>([]);
  public requests = this._requests.asReadonly();

  constructor() {
    effect(() => {
      const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
      if (selectedJurisdiction) {
        this.requestApiService
          .getRequests(
            [selectedJurisdiction.jurisdiction_id],
            this._requestListState().limit,
            this._requestListState().page
          )
          .subscribe(requests =>
            this._requests.update(current => [...requests, ...current])
          );
      }
    });
  }

  setListState(state: Partial<RequestListState>): void {
    this._requestListState.update(current => ({ ...state, ...current }));
  }
}
