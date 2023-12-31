import { Directive, Input, OnChanges, signal } from '@angular/core';
import { VariantProps } from 'cva';
import { cva } from '@utils/cva';

const toastTitleVariants = cva({
  base: 'mb-1 font-medium leading-none tracking-tight',
});
export type ToastTitleVariants = VariantProps<typeof toastTitleVariants>;

@Directive({
  selector: '[mtxToastTitle]',
  standalone: true,
  host: {
    '[attr.class]': 'toastTitleClass()',
  },
})
export class ToastTitleDirective implements OnChanges {
  @Input() class = '';

  protected toastTitleClass = signal(toastTitleVariants({ className: this.class }));

  ngOnChanges() {
    this.toastTitleClass.set(toastTitleVariants({ className: this.class }));
  }
}
