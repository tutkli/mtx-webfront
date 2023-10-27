import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const cardTitleVariants = cva({
  base: 'text-lg font-semibold leading-none tracking-tight',
});
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;

@Directive({
  selector: '[mtxCardTitle]',
  standalone: true,
})
export class CardTitleDirective implements OnChanges {
  @Input() class = '';

  private hostClass = hostBinding(
    'attr.class',
    signal(cardTitleVariants({ className: this.class }))
  );

  ngOnChanges() {
    this.hostClass.set(cardTitleVariants({ className: this.class }));
  }
}
