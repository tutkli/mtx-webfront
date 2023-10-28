import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapComponent } from '@shared/components/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { NavigationButtonsComponent } from '@pages/root/components/navigation-buttons/navigation-buttons.component';
import { Router, RouterOutlet } from '@angular/router';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { provideIcons } from '@ng-icons/core';
import { lucideBuilding2 } from '@ng-icons/lucide';

@Component({
  selector: 'mtx-root-layout',
  standalone: true,
  imports: [
    MapComponent,
    MatSidenavModule,
    ToolbarComponent,
    NavigationButtonsComponent,
    RouterOutlet,
  ],
  providers: [provideIcons({ lucideBuilding2 })],
  template: `
    <div class="h-screen w-screen">
      <mtx-toolbar color="primary" class="gap-4 py-2">
        <img
          [src]="
            selectedAppConfiguration()
              ? selectedAppConfiguration()?.app_blackandwhite_icon_url
              : defaultData.logo
          "
          width="30"
          height="30"
          alt="Application logo" />
        <span class="text-xl">{{
          selectedAppConfiguration()
            ? selectedAppConfiguration()?.name
            : defaultData.title
        }}</span>
      </mtx-toolbar>
      <mat-drawer-container autosize class="box-border h-[calc(100%-46px)]">
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
export default class RootLayoutComponent {
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly appConfigurationService = inject(AppConfigurationService);
  private router = inject(Router);

  selectedJurisdiction = this.jurisdictionService.selectedJurisdiction;
  selectedAppConfiguration = this.appConfigurationService.selectedAppConfiguration;

  readonly defaultData = {
    title: 'Mejora tu ciudad',
    logo: 'assets/images/mtx_white.png',
  };

  unselectJurisdiction(): void {
    this.jurisdictionService.selectJurisdiction();
    this.router.navigate(['list', 'jurisdictions']);
  }
}
