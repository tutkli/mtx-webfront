import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapComponent } from '@shared/components/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { NavigationButtonsComponent } from '@pages/root/components/navigation-buttons/navigation-buttons.component';
import { RouterOutlet } from '@angular/router';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { SidenavService } from '@core/services/sidenav/sidenav.service';
import { SidenavControlComponent } from '@shared/components/sidenav-control/sidenav-control.component';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';

@Component({
  selector: 'mtx-root-layout',
  standalone: true,
  imports: [
    MapComponent,
    MatSidenavModule,
    ToolbarComponent,
    NavigationButtonsComponent,
    RouterOutlet,
    NgIcon,
    ButtonDirective,
    SidenavControlComponent,
  ],
  providers: [provideIcons({ lucideChevronLeft })],
  template: `
    <div class="flex h-screen w-screen flex-col">
      <mtx-toolbar color="primary" class="gap-4 py-2">
        @if (selectedJurisdiction() && jurisdictions().length > 1) {
          <button mtxButton (click)="unselectJurisdiction()" class="h-8 w-8">
            <ng-icon name="lucideChevronLeft" size="1.5rem" />
          </button>
        }

        <img
          [src]="
            selectedAppConfiguration()
              ? selectedAppConfiguration()?.app_blackandwhite_icon_url
              : DEFAULT_MTC.logo
          "
          width="30"
          height="30"
          alt="Application logo" />
        <span class="text-xl">{{
          selectedAppConfiguration()
            ? selectedAppConfiguration()?.name
            : DEFAULT_MTC.title
        }}</span>
      </mtx-toolbar>
      <mat-drawer-container class="box-border h-[calc(100%-46px)]">
        <mat-drawer
          [mode]="sidenavMode()"
          [opened]="sidenavOpen()"
          class="w-full overflow-hidden sm:w-[450px]">
          <mtx-navigation-buttons />
          <router-outlet />
        </mat-drawer>
        <mat-drawer-content>
          <mtx-map />
        </mat-drawer-content>
      </mat-drawer-container>
    </div>

    <mtx-sidenav-control />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RootLayoutComponent {
  private readonly appConfigurationService = inject(AppConfigurationService);
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly sidenavService = inject(SidenavService);

  readonly DEFAULT_MTC = {
    title: 'Mejora tu ciudad',
    logo: 'assets/images/mtx_white.png',
  };

  sidenavOpen = this.sidenavService.sidenavOpen;
  sidenavMode = this.sidenavService.sidenavMode;
  jurisdictions = this.jurisdictionService.jurisdictions;
  selectedJurisdiction = this.jurisdictionService.selectedJurisdiction;
  selectedAppConfiguration = this.appConfigurationService.selectedAppConfiguration;

  unselectJurisdiction() {
    this.jurisdictionService.updateJurisdiction();
  }
}
