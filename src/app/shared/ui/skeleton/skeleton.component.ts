import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  signal,
} from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const skeletonVariants = cva({
  base: 'block animate-pulse bg-muted',
  variants: {
    type: {
      line: 'rounded-md h-4 w-[250px]',
      circle: 'h-12 w-12 rounded-full',
    },
  },
  defaultVariants: {
    type: 'line',
  },
});
export type SkeletonVariants = VariantProps<typeof skeletonVariants>;

@Component({
  selector: 'mtx-skeleton',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent implements OnChanges {
  @Input() class = '';
  @Input() type: SkeletonVariants['type'] = 'line';

  protected _class = signal(skeletonVariants({ type: this.type, className: this.class }));

  ngOnChanges() {
    this._class.set(skeletonVariants({ type: this.type, className: this.class }));
  }
}
