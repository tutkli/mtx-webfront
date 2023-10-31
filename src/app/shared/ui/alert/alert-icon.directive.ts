import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const alertIconVariants = cva({
  base: 'absolute text-foreground left-0 top-2',
});
export type AlertIconVariants = VariantProps<typeof alertIconVariants>;

@Directive({
  selector: '[mtxAlertIcon]',
  standalone: true,
})
export class AlertIconDirective implements OnChanges {
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(
      alertIconVariants({
        className: this.class,
      })
    )
  );

  ngOnChanges() {
    this._class.set(
      alertIconVariants({
        className: this.class,
      })
    );
  }
}
