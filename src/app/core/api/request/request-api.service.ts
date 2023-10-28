import { inject, Injectable } from '@angular/core';
import { injectBaseUrl } from '@core/tokens/api-base-url.token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Request, RequestCountLastDays } from '@core/models/request.model';

@Injectable({ providedIn: 'root' })
export class RequestApiService {
  private readonly baseUrl = injectBaseUrl();
  private readonly http = inject(HttpClient);

  getRequests(jurisdiction_ids: string[], limit = 1, page = 1): Observable<Request[]> {
    const endpoint = `${this.baseUrl}/requests`;
    const params = new HttpParams({
      fromObject: { jurisdiction_ids, limit, page },
    });
    return this.http.get<Request[]>(endpoint, { params });
  }

  getRequestCount(jurisdiction_ids: string[]): Observable<number> {
    const endpoint = `${this.baseUrl}/requests`;
    const params = new HttpParams({
      fromObject: { jurisdiction_ids, limit: 1 },
    });
    return this.http.get<number>(endpoint, { params, observe: 'response' }).pipe(
      map(res => {
        const count = res.headers.get('x-last-page');
        return count ? parseInt(count, 10) : 0;
      })
    );
  }

  getRequestCountLastDays(jurisdiction_ids: string[]): Observable<RequestCountLastDays> {
    const endpoint = `${this.baseUrl}/request/count_last_days`;
    const params = new HttpParams({
      fromObject: { jurisdiction_ids, last_days: 30 },
    });
    return this.http.get<RequestCountLastDays>(endpoint, { params });
  }
}
