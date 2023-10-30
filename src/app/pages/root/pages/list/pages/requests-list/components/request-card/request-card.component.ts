import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDescriptionDirective } from '@shared/ui/card/card-description.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CardTitleDirective } from '@shared/ui/card/card-title.directive';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';
import { TranslocoPipe } from '@ngneat/transloco';
import { Request } from '@core/models/request.model';

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
  ],
  template: `
    <div
      mtxCard
      role="button"
      tabindex="0"
      class="flex items-center gap-2 overflow-hidden p-2 transition-all sm:hover:scale-105">
      <div
        class="h-14 w-14 min-w-[56px] bg-contain bg-center bg-no-repeat p-1.5"
        style='background-image: url("assets/images/nodes/middle_node.png")'>
        <img
          [src]="request.media_url ?? 'assets/images/placeholder_image.jpg'"
          alt="Request image"
          class="h-full w-full rounded-full object-cover object-center"
          width="50"
          height="50" />
      </div>

      <div class="space-y-2">
        <h3 mtxCardTitle class="line-clamp-2">{{ request.description }}</h3>
        <p mtxCardDescription class="line-clamp-1">{{ request.address }}</p>
        <div mtxCardDescription class="flex items-center gap-2">
          <img
            [src]="request.service_icon"
            width="20"
            height="20"
            class="inline-flex rounded-full"
            alt="Request service icon" />
          #{{ request.service_request_id }}
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestCardComponent {
  @Input({ required: true }) request!: Request;
}
