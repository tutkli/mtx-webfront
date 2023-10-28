import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgForOf } from '@angular/common';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { hostBinding } from 'ngxtension/host-binding';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';
import { RequestService } from '@core/services/request/request.service';
import { JurisdictionCardComponent } from '@pages/root/pages/list/components/jurisdiction-card/jurisdiction-card.component';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [NgForOf, JurisdictionCardComponent, ShortNumberPipe, TranslocoPipe],
  template: `
    <h1 class="mb-4 text-2xl font-semibold text-primary">
      {{ 'list.jurisdiction-list' | transloco }}
    </h1>
    <div class="flex space-x-4">
      <div>
        <img
          src="assets/images/resolved.png"
          alt="A man with a thumbs up"
          width="100"
          height="100" />
        <span class="text-sm">{{ 'list.last-days' | transloco }}</span>
      </div>
      <div>
        <h2 class="text-lg">
          <span class="text-2xl font-medium">{{
            totalRequestCountLastDays() | shortNumber
          }}</span>
          {{ 'list.requests' | transloco }}
          <span class="font-medium text-primary">{{
            'list.requests-resolved' | transloco
          }}</span>
        </h2>
        <span class="text-sm">{{ 'list.keep-working' | transloco }}</span>
      </div>
    </div>

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurisdictionListComponent {
  private hostClass = hostBinding(
    'attr.class',
    signal(
      'flex h-full w-full flex-col gap-4 p-4 max-h-[calc(100%-53px)] overflow-auto bg-background'
    )
  );
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly appConfigurationService = inject(AppConfigurationService);
  private readonly requestService = inject(RequestService);

  jurisdictions = this.jurisdictionService.jurisdictions;
  appConfigurationsByJurisdiction =
    this.appConfigurationService.appConfigurationsByJurisdiction;
  requestCountsByJurisdiction = this.requestService.requestCountsByJurisdiction;
  requestCountLastDaysByJurisdiction =
    this.requestService.requestCountLastDaysByJurisdiction;
  totalRequestCountLastDays = this.requestService.totalRequestCountLastDays;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this.jurisdictionService.selectJurisdiction(jurisdiction);
  }
}
