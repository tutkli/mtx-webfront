import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const alertTitleVariants = cva({
  base: 'mb-1 font-medium leading-none tracking-tight',
});
export type AlertTitleVariants = VariantProps<typeof alertTitleVariants>;

@Directive({
  selector: '[mtxAlertTitle]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
})
export class AlertTitleDirective implements OnChanges {
  @Input() class = '';

  protected _class = signal(
    alertTitleVariants({
      className: this.class,
    })
  );

  ngOnChanges() {
    this._class.set(
      alertTitleVariants({
        className: this.class,
      })
    );
  }
}
