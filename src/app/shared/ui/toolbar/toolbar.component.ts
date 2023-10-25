import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnChanges,
  signal,
} from '@angular/core';
import { cva } from '@utils/cva';
import { type VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const toolbar = cva({
  base: 'flex items-center gap-2 w-full p-4 font-semibold',
  variants: {
    color: {
      default: 'bg-secondary text-secondary-foreground',
      primary: 'bg-primary text-primary-foreground',
    },
  },
});

export type ToolbarVariants = VariantProps<typeof toolbar>;

@Component({
  selector: 'mtx-toolbar',
  standalone: true,
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnChanges {
  @Input() color: ToolbarVariants['color'] = 'default';
  @Input() class = '';

  hostClass = hostBinding(
    'attr.class',
    signal(toolbar({ color: this.color, className: this.class }))
  );

  ngOnChanges() {
    this.hostClass.set(toolbar({ color: this.color, className: this.class }));
  }
}
