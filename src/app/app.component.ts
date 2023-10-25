import { Component, inject, OnInit } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [],
})
export class AppComponent implements OnInit {
  private jurisdictionService = inject(JurisdictionService);
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.jurisdictionService.getJurisdictions();
  }
}
