import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideList,
  lucideMap,
} from '@ng-icons/lucide';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { SidenavService } from '@core/services/sidenav/sidenav.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { BreakpointService } from '@core/services/breakpoint/breakpoint.service';

@Component({
  selector: 'mtx-sidenav-control',
  standalone: true,
  imports: [NgIcon, ButtonDirective, TranslocoPipe],
  providers: [
    provideIcons({ lucideChevronLeft, lucideChevronRight, lucideMap, lucideList }),
  ],
  template: ` @if (smBreakpoint()) {
      <button
        [class]="xsKlass()"
        mtxButton
        type="default"
        (click)="setSidenavOpen(!sidenavOpen())">
        <span class="mr-2">{{
          (sidenavOpen() ? 'sidenav.show-map' : 'sidenav.show-list') | transloco
        }}</span>
        <ng-icon [name]="sidenavOpen() ? 'lucideMap' : 'lucideList'" size="1.3rem" />
      </button>
    } @else {
      <button
        [class]="klass()"
        mtxButton
        type="background"
        (click)="setSidenavOpen(!sidenavOpen())">
        <ng-icon [name]="sidenavOpen() ? 'lucideChevronLeft' : 'lucideChevronRight'" />
        @if (!sidenavOpen()) {
          <span class="ml-2">
            {{ 'sidenav.show-list' | transloco }}
          </span>
        }
      </button>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavControlComponent {
  private readonly breakpointService = inject(BreakpointService);

  private readonly sidenavService = inject(SidenavService);

  smBreakpoint = this.breakpointService.sm;
  sidenavOpen = this.sidenavService.sidenavOpen;
  klass = computed(
    () =>
      `absolute top-[4.5rem] z-10 flex overflow-hidden border-2 border-border shadow-sm transition-left duration-250 h-11 ${
        this.sidenavOpen() ? 'left-[475px]' : 'left-5'
      }`
  );
  xsKlass = computed(
    () =>
      `absolute bottom-16 left-0 w-fit right-0 z-10 flex overflow-hidden shadow-sm transition-left duration-250 h-11 mx-auto`
  );

  setSidenavOpen(value: boolean) {
    this.sidenavService.setSidenavOpen(value);
  }
}
