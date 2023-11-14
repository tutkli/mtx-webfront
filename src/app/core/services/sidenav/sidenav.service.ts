import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointService } from '@core/services/breakpoint/breakpoint.service';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private readonly breakpointService = inject(BreakpointService);

  private _sidenavOpen = signal(true);
  private _smBreakpoint = this.breakpointService.sm;

  public sidenavOpen = this._sidenavOpen.asReadonly();
  public sidenavMode = computed<MatDrawerMode>(() =>
    this._smBreakpoint() ? 'over' : 'side'
  );

  public setSidenavOpen = (value: boolean) => this._sidenavOpen.set(value);

  private handleResize = effect(() => {
    if (this._smBreakpoint()) {
      untracked(() => this._sidenavOpen.set(true));
    }
  });
}
