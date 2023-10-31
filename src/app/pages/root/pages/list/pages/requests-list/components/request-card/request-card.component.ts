import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDescriptionDirective } from '@shared/ui/card/card-description.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CardTitleDirective } from '@shared/ui/card/card-title.directive';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';
import { TranslocoPipe } from '@ngneat/transloco';
import { Request } from '@core/models/request.model';
import { statusNodeImage } from '@core/models/status-node.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle, lucideThumbsDown, lucideThumbsUp } from '@ng-icons/lucide';
import { RequestService } from '@core/services/request/request.service';

@Component({
  selector: 'mtx-request-card',
  standalone: true,
  imports: [
    CommonModule,
    CardDescriptionDirective,
    CardDirective,
    CardTitleDirective,
    ShortNumberPipe,
    TranslocoPipe,
    NgIcon,
  ],
  providers: [provideIcons({ lucideThumbsUp, lucideThumbsDown, lucideMessageCircle })],
  template: `
    <div
      mtxCard
      role="button"
      tabindex="0"
      (click)="selectRequest()"
      class="flex items-center gap-2 overflow-hidden p-2 transition-all sm:hover:scale-105">
      <div
        class="h-14 w-14 min-w-[56px] bg-contain bg-center bg-no-repeat p-1.5"
        [style]="requestNodeImageStyle()">
        <img
          [src]="request.media_url ?? 'assets/images/placeholder_image.jpg'"
          alt="Request image"
          class="h-full w-full rounded-full object-center"
          [ngClass]="{ 'object-cover': !request.media_url }" />
      </div>

      <div class="w-full space-y-2">
        <h3 mtxCardTitle class="line-clamp-2">{{ request.description }}</h3>
        <p mtxCardDescription class="line-clamp-1">{{ request.address }}</p>
        <div mtxCardDescription class="flex items-center justify-between">
          <div>
            <img
              [src]="request.service_icon"
              width="20"
              height="20"
              class="inline-flex rounded-full"
              alt="Request service icon" />
            #{{ request.service_request_id }}
          </div>

          <div class="flex space-x-2">
            <span class="align-middle">
              <ng-icon name="lucideThumbsUp" />
              {{ request.reiterations_count }}
            </span>

            <span class="align-middle">
              <ng-icon name="lucideThumbsDown" />
              {{ request.complaints_count }}
            </span>

            <span class="align-middle">
              <ng-icon name="lucideMessageCircle" />
              {{ request.comments_count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestCardComponent {
  @Input({ required: true }) request!: Request;

  private requestService = inject(RequestService);

  selectRequest() {
    this.requestService.selectRequest(this.request);
  }

  requestNodeImageStyle = computed(() => {
    return `background-image: url('${statusNodeImage[this.request.status_node_type]}')`;
  });
}
