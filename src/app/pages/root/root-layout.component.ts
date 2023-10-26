import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JurisdictionListComponent } from '@pages/root/components/jurisdiction-list/jurisdiction-list.component';
import { MapComponent } from '@shared/components/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { NavigationButtonsComponent } from '@pages/root/components/navigation-buttons/navigation-buttons.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mtx-root-layout',
  standalone: true,
  imports: [
    JurisdictionListComponent,
    MapComponent,
    MatSidenavModule,
    ToolbarComponent,
    NavigationButtonsComponent,
    RouterOutlet,
  ],
  template: `
    <div class="h-screen w-screen">
      <mtx-toolbar color="primary">
        <span>Mejora tu ciudad</span>
      </mtx-toolbar>
      <mat-drawer-container autosize class="box-border h-[calc(100%-56px)]">
        <mat-drawer mode="side" opened class="min-w-[400px] overflow-hidden">
          <mtx-navigation-buttons />
          <router-outlet />
        </mat-drawer>
        <mat-drawer-content>
          <mtx-map />
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RootLayoutComponent {}
