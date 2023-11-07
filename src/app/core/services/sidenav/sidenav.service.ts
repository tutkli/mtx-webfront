import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import { xsBreakpoint } from '@utils/breakpoint-observer';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _sidenavOpen = signal(true);

  public sidenavOpen = this._sidenavOpen.asReadonly();
  public sidenavMode = computed<MatDrawerMode>(() => (xsBreakpoint() ? 'over' : 'side'));

  public setSidenavOpen = (value: boolean) => this._sidenavOpen.set(value);

  private handleResize = effect(() => {
    if (xsBreakpoint()) {
      untracked(() => this._sidenavOpen.set(true));
    }
  });
}
