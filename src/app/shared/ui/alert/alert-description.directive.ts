import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const alertDescriptionVariants = cva({
  base: 'text-sm [&_p]:leading-relaxed',
});
export type AlertDescriptionVariants = VariantProps<typeof alertDescriptionVariants>;

@Directive({
  selector: '[mtxAlertDesc],[mtxAlertDescription]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
})
export class AlertDescriptionDirective implements OnChanges {
  @Input() class = '';

  protected _class = signal(
    alertDescriptionVariants({
      className: this.class,
    })
  );

  ngOnChanges() {
    this._class.set(
      alertDescriptionVariants({
        className: this.class,
      })
    );
  }
}
