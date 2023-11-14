import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const cardTitleVariants = cva({
  base: 'text-lg  font-semibold leading-6 tracking-tight',
});
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;

@Directive({
  selector: '[mtxCardTitle]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
})
export class CardTitleDirective implements OnChanges {
  @Input() class = '';

  protected _class = signal(cardTitleVariants({ className: this.class }));

  ngOnChanges() {
    this._class.set(cardTitleVariants({ className: this.class }));
  }
}
