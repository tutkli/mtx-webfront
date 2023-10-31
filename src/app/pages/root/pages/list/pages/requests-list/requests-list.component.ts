import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RequestService } from '@core/services/request/request.service';
import { NgForOf, NgIf } from '@angular/common';
import { ListHeaderComponent } from '@pages/root/pages/list/components/list-header/list-header.component';
import { ListService } from '@pages/root/pages/list/services/list.service';
import { hostBinding } from 'ngxtension/host-binding';
import { RequestCardComponent } from '@pages/root/pages/list/pages/requests-list/components/request-card/request-card.component';
import { ListSkeletonComponent } from '@pages/root/pages/list/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'mtx-requests-list',
  standalone: true,
  imports: [
    NgForOf,
    ListHeaderComponent,
    RequestCardComponent,
    ListSkeletonComponent,
    NgIf,
  ],
  template: `
    <mtx-list-header
      titleRef="list.request-list"
      [totalCountLastDays]="selectedJurisdictionLastDays()" />
    <ng-container *ngIf="requests().length; else listSkeleton">
      <div class="flex flex-col space-y-2">
        <mtx-request-card *ngFor="let request of requests()" [request]="request" />
      </div>
    </ng-container>

    <ng-template #listSkeleton>
      <mtx-list-skeleton />
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequestsListComponent {
  private _class = hostBinding(
    'attr.class',
    signal(
      'flex h-full w-full flex-col gap-4 p-4 max-h-[calc(100%-53px)] overflow-auto bg-background'
    )
  );

  private readonly requestService = inject(RequestService);
  private readonly listService = inject(ListService);

  selectedJurisdictionLastDays = this.listService.selectedJurisdictionLastDays;
  requests = this.requestService.requests;
}
