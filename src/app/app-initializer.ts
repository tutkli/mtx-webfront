import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { ThemeService } from '@core/services/theme/theme.service';

export function initializeApp(
  jurisdictionService: JurisdictionService,
  themeService: ThemeService
) {
  return () =>
    new Promise<void>(resolve => {
      jurisdictionService.init();
      resolve();
    });
}
