import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const alertCloseVariants = cva({
  base: 'absolute text-foreground right-0 top-2',
});
export type AlertCloseVariants = VariantProps<typeof alertCloseVariants>;

@Directive({
  selector: '[mtxAlertClose]',
  standalone: true,
})
export class AlertCloseDirective implements OnChanges {
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(
      alertCloseVariants({
        className: this.class,
      })
    )
  );

  ngOnChanges() {
    this._class.set(
      alertCloseVariants({
        className: this.class,
      })
    );
  }
}
