import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import { breakpointObserver } from '@utils/breakpoint-observer';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _sidenavOpen = signal(true);
  private _xsBreakpoint = breakpointObserver.smallerOrEqual('sm');

  public sidenavOpen = this._sidenavOpen.asReadonly();
  public sidenavMode = computed<MatDrawerMode>(() =>
    this._xsBreakpoint() ? 'over' : 'side'
  );

  public setSidenavOpen = (value: boolean) => this._sidenavOpen.set(value);

  private handleResize = effect(() => {
    if (this._xsBreakpoint()) {
      untracked(() => this._sidenavOpen.set(true));
    }
  });
}
