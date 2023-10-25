import { inject, Injectable } from '@angular/core';
import { injectBaseUrl } from '@core/tokens/api-base-url.token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfiguration } from '@core/models/app-configuration.model';

@Injectable({ providedIn: 'root' })
export class AppConfigurationApiService {
  private readonly baseUrl = injectBaseUrl();
  private readonly http = inject(HttpClient);

  getAppConfiguration(jurisdiction_id: string): Observable<AppConfiguration> {
    const endpoint = `${this.baseUrl}/appconfiguration`;
    const params = new HttpParams({
      fromObject: { jurisdiction_id, type: 'cityweb' },
    });
    return this.http.get<AppConfiguration>(endpoint, { params });
  }
}
