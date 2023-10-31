import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { Request } from '@core/models/request.model';
import { RequestApiService } from '@core/api/request/request-api.service';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

export interface RequestState {
  requests: Request[];
  highlightedRequest: Request | undefined;
  selectedRequest: Request | undefined;
  page: number;
  limit: number;
  loading: boolean;
}

const DEFAULT_STATE: RequestState = {
  requests: [],
  highlightedRequest: undefined,
  selectedRequest: undefined,
  page: 1,
  limit: 50,
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly requestApiService = inject(RequestApiService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private _requests = signal(DEFAULT_STATE.requests);
  private _highlightedRequest = signal(DEFAULT_STATE.highlightedRequest, {
    equal: (a, b) => a?.token === b?.token,
  });
  private _selectedRequest = signal(DEFAULT_STATE.selectedRequest, {
    equal: (a, b) => a?.token === b?.token,
  });
  private _page = signal(DEFAULT_STATE.page);
  private _limit = signal(DEFAULT_STATE.limit);
  private _loading = signal(DEFAULT_STATE.loading);

  public requests = this._requests.asReadonly();
  public highlightedRequest = this._highlightedRequest.asReadonly();
  public selectedRequest = this._selectedRequest.asReadonly();
  public page = this._page.asReadonly();
  public limit = this._limit.asReadonly();
  public loading = this._loading.asReadonly();

  public setLoading = (value: boolean) => this._loading.set(value);
  public updateRequests = (requests: Request[]) =>
    this._requests.update(v => [...v, ...requests]);
  public highlightRequest = (value?: Request) => this._highlightedRequest.set(value);
  public selectRequest = (value?: Request) => this._selectedRequest.set(value);
  public resetState = () => {
    this._requests.set(DEFAULT_STATE.requests);
    this._highlightedRequest.set(DEFAULT_STATE.highlightedRequest);
    this._selectedRequest.set(DEFAULT_STATE.selectedRequest);
    this._page.set(DEFAULT_STATE.page);
    this._limit.set(DEFAULT_STATE.limit);
    this._loading.set(DEFAULT_STATE.loading);
  };

  private getRequests = effect(() => {
    const selectedJurisdiction = this.jurisdictionService.selectedJurisdiction();
    if (selectedJurisdiction) {
      untracked(() => this.setLoading(true));
      this.requestApiService
        .getRequests([selectedJurisdiction.jurisdiction_id], this.limit(), this.page())
        .subscribe({
          next: requests => untracked(() => this.updateRequests(requests)),
          complete: () => untracked(() => this.setLoading(false)),
        });
    } else {
      untracked(() => this.resetState());
    }
  });
}
