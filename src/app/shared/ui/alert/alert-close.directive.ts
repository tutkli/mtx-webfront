import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const alertCloseVariants = cva({
  base: 'absolute text-foreground right-0 top-2',
});
export type AlertCloseVariants = VariantProps<typeof alertCloseVariants>;

@Directive({
  selector: '[mtxAlertClose]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
})
export class AlertCloseDirective implements OnChanges {
  @Input() class = '';

  protected _class = signal(
    alertCloseVariants({
      className: this.class,
    })
  );

  ngOnChanges() {
    this._class.set(
      alertCloseVariants({
        className: this.class,
      })
    );
  }
}
