import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardSkeletonComponent } from '@shared/components/card-skeleton/card-skeleton.component';
import { arrayAttribute } from '@utils/transforms/array-attribute';

@Component({
  selector: 'mtx-list-skeleton',
  standalone: true,
  imports: [CardSkeletonComponent],
  template: `
    <div class="relative flex flex-col space-y-2">
      @for (i of repetitions; track $index) {
        <mtx-card-skeleton />
      }
      <div class="absolute -bottom-10 h-24 w-full bg-background blur-lg"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSkeletonComponent {
  @Input({ transform: arrayAttribute }) repetitions = arrayAttribute(5);
}
