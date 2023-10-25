import { inject, Injectable } from '@angular/core';
import { injectBaseUrl } from '../../tokens/api-base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jurisdiction } from '../../models/jurisdiction.model';

@Injectable({ providedIn: 'root' })
export class JurisdictionApiService {
  private readonly baseUrl = injectBaseUrl();
  private readonly http = inject(HttpClient);

  getJurisdictions(): Observable<Jurisdiction[]> {
    const endpoint = `${this.baseUrl}/jurisdictions`;
    return this.http.get<Jurisdiction[]>(endpoint);
  }
}
