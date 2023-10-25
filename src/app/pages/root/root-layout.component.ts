import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JurisdictionListComponent } from '@pages/root/components/jurisdiction-list/jurisdiction-list.component';
import { MapComponent } from '@shared/components/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';
import { TabsComponent } from '@shared/ui/tabs/tabs.component';
import { TabsListComponent } from '@shared/ui/tabs/tabs-list.component';
import { TabsContentDirective } from '@shared/ui/tabs/tabs-content.directive';
import { TabsTriggerDirective } from '@shared/ui/tabs/tabs-trigger.component';

@Component({
  selector: 'mtx-root-layout',
  standalone: true,
  imports: [
    JurisdictionListComponent,
    MapComponent,
    MatSidenavModule,
    ToolbarComponent,
    TabsComponent,
    TabsListComponent,
    TabsContentDirective,
    TabsTriggerDirective,
  ],
  template: `
    <div class="h-screen w-screen">
      <mtx-toolbar color="primary">
        <span>Mejora tu ciudad</span>
      </mtx-toolbar>
      <mat-drawer-container autosize class="box-border h-[calc(100%-56px)]">
        <mat-drawer mode="side" opened class="min-w-[400px]">
          <mtx-tabs value="jurisdictions">
            <mtx-tabs-list aria-label="Navigation Menu" class="w-full">
              <button mtxTabsTrigger="jurisdictions">Jurisdicciones</button>
            </mtx-tabs-list>

            <div mtxTabsContent="jurisdictions">
              <mtx-jurisdiction-list />
            </div>
          </mtx-tabs>
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
