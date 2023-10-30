import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { Request } from '@core/models/request.model';
import { RequestApiService } from '@core/api/request/request-api.service';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

export interface RequestState {
  requests: Request[];
  page: number;
  limit: number;
  loading: boolean;
}

const DEFAULT_STATE: RequestState = {
  requests: [],
  page: 1,
  limit: 50,
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly requestApiService = inject(RequestApiService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private _requestListState = signal<RequestState>(DEFAULT_STATE);

  public requestListState = this._requestListState.asReadonly();
  public requests = computed(() => this._requestListState().requests);
  public page = computed(() => this._requestListState().page);
  public limit = computed(() => this._requestListState().limit);
  public loading = computed(() => this.requestListState().loading);

  public setLoading = (loading: boolean) =>
    this._requestListState.update(v => ({ ...v, loading }));
  public updateRequests = (requests: Request[]) =>
    this._requestListState.update(v => ({
      ...v,
      requests: [...v.requests, ...requests],
    }));
  public resetState = () => this._requestListState.set(DEFAULT_STATE);

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
