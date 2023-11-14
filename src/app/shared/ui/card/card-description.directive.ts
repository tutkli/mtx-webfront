import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const cardDescriptionVariants = cva({
  base: 'text-sm text-muted-foreground',
});
export type CardDescriptionVariants = VariantProps<typeof cardDescriptionVariants>;

@Directive({
  selector: '[mtxCardDescription]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
  },
})
export class CardDescriptionDirective implements OnChanges {
  @Input() class = '';

  protected _class = signal(cardDescriptionVariants({ className: this.class }));

  ngOnChanges() {
    this._class.set(cardDescriptionVariants({ className: this.class }));
  }
}
