import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RequestService } from '@core/services/request/request.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { Router } from '@angular/router';
import { lucideX } from '@ng-icons/lucide';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'mtx-request-detail',
  standalone: true,
  imports: [NgIcon, ButtonDirective, TranslocoPipe],
  providers: [provideIcons({ lucideX })],
  template: `
    <div class="relative flex flex-col">
      <button
        mtxButton
        type="background"
        class="absolute right-2 top-2 z-10"
        (click)="closeDetail()">
        <ng-icon name="lucideX" size="1rem" />
      </button>
      <div>
        <img
          [src]="request()?.media_url ?? 'assets/images/placeholder_image.jpg'"
          class="max-h-[375px] w-[450px] object-cover object-center"
          alt="Request image" />
      </div>

      <div
        class="w-full border-y border-border bg-secondary p-4 text-secondary-foreground">
        <h2 class="text-lg font-semibold">
          {{ 'label.request' | transloco }} #{{ request()?.service_request_id }}
        </h2>
        <h3>{{ request()?.service_name }}</h3>
      </div>

      <div class="p-4">
        <h4 class="my-2 font-semibold">{{ 'request-detail.description' | transloco }}</h4>
        <p>{{ request()?.description }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequestDetailComponent {
  private readonly requestService = inject(RequestService);
  private readonly router = inject(Router);

  request = this.requestService.selectedRequest;

  closeDetail() {
    this.requestService.selectRequest();
    this.router.navigate(['list']).then();
  }
}
