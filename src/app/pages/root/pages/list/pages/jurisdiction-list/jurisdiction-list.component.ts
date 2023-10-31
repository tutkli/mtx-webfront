import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { hostBinding } from 'ngxtension/host-binding';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { JurisdictionCardComponent } from '@pages/root/pages/list/pages/jurisdiction-list/components/jurisdiction-card/jurisdiction-card.component';
import { ListService } from '@pages/root/pages/list/services/list.service';
import { ListHeaderComponent } from '@pages/root/pages/list/components/list-header/list-header.component';
import { ListSkeletonComponent } from '@pages/root/pages/list/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [
    NgForOf,
    JurisdictionCardComponent,
    ListHeaderComponent,
    ListSkeletonComponent,
    NgIf,
  ],
  template: `
    <mtx-list-header
      titleRef="list.jurisdiction-list"
      [totalCountLastDays]="totalRequestCountLastDays()" />

    <ng-container *ngIf="jurisdictions().length; else listSkeleton">
      <div class="flex flex-col space-y-2">
        <mtx-jurisdiction-card
          *ngFor="let jurisdiction of jurisdictions()"
          (click)="selectJurisdiction(jurisdiction)"
          (keyup.enter)="$event.preventDefault(); selectJurisdiction(jurisdiction)"
          [jurisdiction]="jurisdiction"
          [requestCount]="requestCountsByJurisdiction().get(jurisdiction.jurisdiction_id)"
          [requestCountLastDays]="
            requestCountLastDaysByJurisdiction().get(jurisdiction.jurisdiction_id)
          "
          [appConfiguration]="
            appConfigurationsByJurisdiction().get(jurisdiction.jurisdiction_id)
          " />
      </div>
    </ng-container>

    <ng-template #listSkeleton>
      <mtx-list-skeleton />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JurisdictionListComponent {
  private hostClass = hostBinding(
    'attr.class',
    signal(
      'flex h-full w-full flex-col gap-4 p-4 max-h-[calc(100%-53px)] overflow-auto bg-background'
    )
  );
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly appConfigurationService = inject(AppConfigurationService);
  private readonly listService = inject(ListService);

  jurisdictions = this.jurisdictionService.jurisdictions;
  appConfigurationsByJurisdiction =
    this.appConfigurationService.appConfigurationsByJurisdiction;
  requestCountsByJurisdiction = this.listService.requestCountsByJurisdiction;
  requestCountLastDaysByJurisdiction =
    this.listService.requestCountLastDaysByJurisdiction;
  totalRequestCountLastDays = this.listService.totalRequestCountLastDays;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    if (!this.appConfigurationsByJurisdiction().get(jurisdiction.jurisdiction_id)) {
      this.jurisdictionService.showJurisdictionErrorToast();
      return;
    }
    this.jurisdictionService.updateJurisdiction(jurisdiction);
  }
}
