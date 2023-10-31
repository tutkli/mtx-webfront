import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const alertVariants = cva({
  base: 'relative w-full rounded-lg p-2',
  variants: {
    type: {
      default: 'bg-background text-foreground',
      warn: 'text-warn [&>[mtxAlertIcon]]:text-warn',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
export type AlertVariants = VariantProps<typeof alertVariants>;

@Directive({
  selector: '[mtxAlert]',
  standalone: true,
  host: {
    role: 'alert',
  },
})
export class AlertDirective implements OnChanges {
  @Input() type: AlertVariants['type'] = 'default';
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(alertVariants({ type: this.type, className: this.class }))
  );

  ngOnChanges() {
    this._class.set(
      alertVariants({
        type: this.type,
        className: this.class,
      })
    );
  }
}
