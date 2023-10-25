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
  base: 'flex items-center gap-2 w-full p-4 font-semibold bg-secondary text-secondary-foreground',
});

export type ToolbarVariants = VariantProps<typeof toolbar>;

@Component({
  selector: 'mtx-toolbar',
  standalone: true,
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnChanges {
  hostClass = hostBinding('attr.class', signal(toolbar()));

  @Input() class = '';

  ngOnChanges() {
    this.hostClass.set(toolbar({ className: this.class }));
  }
}
