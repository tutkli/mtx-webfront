import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'mtx-list-header',
  standalone: true,
  imports: [CommonModule, ShortNumberPipe, TranslocoPipe],
  template: `
    <h1 class="mb-4 text-2xl font-semibold text-primary">
      {{ titleRef | transloco }}
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
          <span class="text-2xl font-medium">{{ totalCountLastDays | shortNumber }}</span>
          {{ 'label.requests' | transloco | lowercase }}
          <span class="font-medium text-primary">{{
            'list.requests-resolved' | transloco
          }}</span>
        </h2>
        <span class="text-sm">{{ 'list.keep-working' | transloco }}</span>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHeaderComponent {
  @Input({ required: true }) titleRef!: string;
  @Input({ required: true }) totalCountLastDays!: number;
}
