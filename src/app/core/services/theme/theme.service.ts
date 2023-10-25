import { effect, inject, Injectable } from '@angular/core';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private appConfigurationService = inject(AppConfigurationService);
  private readonly defaultColor = '#7da038';

  appConfiguration = this.appConfigurationService.appConfiguration;

  constructor() {
    effect(() => {
      this.document.documentElement.style.setProperty(
        '--primary',
        this.appConfiguration()?.main_color ?? this.defaultColor
      );
    });
  }
}
