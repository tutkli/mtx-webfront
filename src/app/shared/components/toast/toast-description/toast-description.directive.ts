import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '../../../../../../../../CAELUM/caelum/src/app/shared/utils/cva';
import { VariantProps } from 'cva';

const toastDescriptionVariants = cva({
  base: 'text-sm leading-relaxed',
});
export type ToastDescriptionVariants = VariantProps<typeof toastDescriptionVariants>;

@Directive({
  selector: '[mtxToastDescription]',
  standalone: true,
  host: {
    '[attr.class]': 'toastDescriptionClass()',
  },
})
export class ToastDescriptionDirective implements OnChanges {
  @Input() class = '';

  protected toastDescriptionClass = signal(
    toastDescriptionVariants({ className: this.class })
  );

  ngOnChanges() {
    this.toastDescriptionClass.set(toastDescriptionVariants({ className: this.class }));
  }
}
