import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { MapComponent } from '@shared/components/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { NavigationButtonsComponent } from '@pages/root/components/navigation-buttons/navigation-buttons.component';
import { RouterOutlet } from '@angular/router';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideMenu } from '@ng-icons/lucide';
import { breakpointObserver } from '@utils/breakpoint-observer';
import { ButtonDirective } from '@shared/ui/button/button.directive';

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
  ],
  providers: [provideIcons({ lucideChevronLeft, lucideMenu })],
  template: `
    <div class="flex h-screen w-screen flex-col">
      <mtx-toolbar color="primary" class="gap-4 py-2">
        <button mtxButton (click)="sidenavOpen.set(!sidenavOpen())" class="h-8 w-8">
          <ng-icon
            [name]="sidenavOpen() ? 'lucideChevronLeft' : 'lucideMenu'"
            size="1.5rem" />
        </button>

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
        <mat-drawer
          [mode]="xsBreakpoint() ? 'over' : 'side'"
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
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RootLayoutComponent {
  private readonly appConfigurationService = inject(AppConfigurationService);

  selectedAppConfiguration = this.appConfigurationService.selectedAppConfiguration;
  sidenavOpen = signal(true);
  xsBreakpoint = breakpointObserver.smallerOrEqual('sm');

  private handleResize = effect(() => {
    if (this.xsBreakpoint()) {
      untracked(() => this.sidenavOpen.set(true));
    }
  });

  readonly defaultData = {
    title: 'Mejora tu ciudad',
    logo: 'assets/images/mtx_white.png',
  };
}
