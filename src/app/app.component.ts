import { Component, signal } from '@angular/core';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [ToolbarComponent, MatSidenavModule],
  template: `<div class="h-screen w-screen">
    <mtx-toolbar color="primary">
      <span>Mejora tu ciudad</span>
    </mtx-toolbar>
    <mat-drawer-container autosize class="box-border h-[calc(100%-56px)]">
      <mat-drawer mode="side" [opened]="open()">Drawer content</mat-drawer>
      <mat-drawer-content class="box-border bg-background p-4">
        <button class="rounded-lg bg-primary p-2" (click)="open.set(!open())">
          Toggle
        </button>
      </mat-drawer-content>
    </mat-drawer-container>
  </div>`,
  styles: [],
})
export class AppComponent {
  open = signal(true);
}
