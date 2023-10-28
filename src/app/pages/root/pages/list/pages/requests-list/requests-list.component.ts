import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RequestService } from '@core/services/request/request.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'mtx-requests-list',
  standalone: true,
  imports: [NgForOf],
  template: `
    <div *ngFor="let request of requests()" class="rounded-lg border border-border p-2">
      {{ request.address }}
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsListComponent {
  private readonly requestService = inject(RequestService);

  requests = this.requestService.requests;
}
