import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { JurisdictionCardComponent } from '@pages/root/pages/list/pages/jurisdiction-list/components/jurisdiction-card/jurisdiction-card.component';
import { ListService } from '@pages/root/pages/list/services/list.service';
import { ListHeaderComponent } from '@pages/root/pages/list/components/list-header/list-header.component';
import { ListSkeletonComponent } from '@pages/root/pages/list/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [JurisdictionCardComponent, ListHeaderComponent, ListSkeletonComponent],
  host: {
    class:
      'flex h-full w-full flex-col gap-4 p-4 max-h-[calc(100%-53px)] overflow-auto bg-background',
  },
  template: `
    <mtx-list-header
      titleRef="list.jurisdiction-list"
      [totalCountLastDays]="totalRequestCountLastDays()" />

    @if (jurisdictions().length) {
      <div class="flex flex-col space-y-2">
        @for (jurisdiction of jurisdictions(); track jurisdiction.id) {
          <mtx-jurisdiction-card
            (click)="selectJurisdiction(jurisdiction)"
            (keyup.enter)="$event.preventDefault(); selectJurisdiction(jurisdiction)"
            [jurisdiction]="jurisdiction"
            [requestCount]="
              requestCountsByJurisdiction().get(jurisdiction.jurisdiction_id)
            "
            [requestCountLastDays]="
              requestCountLastDaysByJurisdiction().get(jurisdiction.jurisdiction_id)
            "
            [appConfiguration]="
              appConfigsByJurisdiction()[jurisdiction.jurisdiction_id]
            " />
        }
      </div>
    } @else {
      <mtx-list-skeleton />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JurisdictionListComponent {
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly appConfigurationService = inject(AppConfigurationService);
  private readonly listService = inject(ListService);

  jurisdictions = this.jurisdictionService.jurisdictions;
  appConfigsByJurisdiction = this.appConfigurationService.appConfigsByJurisdiction;
  requestCountsByJurisdiction = this.listService.requestCountsByJurisdiction;
  requestCountLastDaysByJurisdiction =
    this.listService.requestCountLastDaysByJurisdiction;
  totalRequestCountLastDays = this.listService.totalRequestCountLastDays;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    if (!this.appConfigsByJurisdiction()[jurisdiction.jurisdiction_id]) {
      this.jurisdictionService.showJurisdictionErrorToast();
      return;
    }
    this.jurisdictionService.updateJurisdiction(jurisdiction);
  }
}
