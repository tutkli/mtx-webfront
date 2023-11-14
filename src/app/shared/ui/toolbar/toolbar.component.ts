import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnChanges,
  signal,
} from '@angular/core';
import { cva } from '@utils/cva';
import { type VariantProps } from 'cva';

const toolbarVariants = cva({
  base: 'flex items-center gap-2 w-full p-4 font-semibold',
  variants: {
    color: {
      default: 'bg-secondary text-secondary-foreground',
      primary: 'bg-primary text-primary-foreground',
    },
  },
});

export type ToolbarVariants = VariantProps<typeof toolbarVariants>;

@Component({
  selector: 'mtx-toolbar',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnChanges {
  @Input() color: ToolbarVariants['color'] = 'default';
  @Input() class = '';

  protected _class = signal(
    toolbarVariants({ color: this.color, className: this.class })
  );

  ngOnChanges() {
    this._class.set(toolbarVariants({ color: this.color, className: this.class }));
  }
}
