import { inject, Injectable, signal } from '@angular/core';
import { AppConfigurationApiService } from '@core/api/app-configuration/app-configuration-api.service';
import { AppConfiguration } from '@core/models/app-configuration.model';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private readonly appConfigurationApiService = inject(
    AppConfigurationApiService
  );

  private _appConfiguration = signal<AppConfiguration | undefined>(undefined);
  appConfiguration = this._appConfiguration.asReadonly();

  getAppConfiguration(jurisdictionId: string): void {
    this.appConfigurationApiService
      .getAppConfiguration(jurisdictionId)
      .subscribe({
        next: appConfiguration => this._appConfiguration.set(appConfiguration),
        error: () => this._appConfiguration.set(undefined),
      });
  }
}
