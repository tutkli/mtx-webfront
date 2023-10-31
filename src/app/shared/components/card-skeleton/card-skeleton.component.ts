import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardDirective } from '@shared/ui/card/card.directive';
import { SkeletonComponent } from '@shared/ui/skeleton/skeleton.component';

@Component({
  selector: 'mtx-card-skeleton',
  standalone: true,
  imports: [CardDirective, SkeletonComponent],
  template: `
    <div mtxCard class="flex items-center gap-2 overflow-hidden p-4 transition-all">
      <mtx-skeleton type="circle" />
      <div class="space-y-2">
        <mtx-skeleton />
        <mtx-skeleton />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeletonComponent {}
