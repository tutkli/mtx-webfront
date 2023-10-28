import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const alertDescriptionVariants = cva({
  base: 'text-sm [&_p]:leading-relaxed',
});
export type AlertDescriptionVariants = VariantProps<
  typeof alertDescriptionVariants
>;

@Directive({
  selector: '[mtxAlertDesc],[mtxAlertDescription]',
  standalone: true,
})
export class AlertDescriptionDirective implements OnChanges {
  @Input() class = '';

  private hostClass = hostBinding(
    'attr.class',
    signal(
      alertDescriptionVariants({
        className: this.class,
      })
    )
  );

  ngOnChanges() {
    this.hostClass.set(
      alertDescriptionVariants({
        className: this.class,
      })
    );
  }
}
