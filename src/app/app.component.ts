import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapComponent } from '@shared/components/map/map.component';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { JurisdictionListComponent } from './pages/jurisdiction-list/jurisdiction-list.component';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatSidenavModule,
    MapComponent,
    JurisdictionListComponent,
  ],
  template: `<div class="h-screen w-screen">
    <mtx-toolbar color="primary">
      <span>Mejora tu ciudad</span>
    </mtx-toolbar>
    <mat-drawer-container autosize class="box-border h-[calc(100%-56px)]">
      <mat-drawer mode="side" opened>
        <mtx-jurisdiction-list />
      </mat-drawer>
      <mat-drawer-content>
        <mtx-map />
      </mat-drawer-content>
    </mat-drawer-container>
  </div>`,
  styles: [],
})
export class AppComponent implements OnInit {
  private jurisdictionService = inject(JurisdictionService);
  private themeService = inject(ThemeService);

  ngOnInit() {
    this.jurisdictionService.getJurisdictions();
  }
}
