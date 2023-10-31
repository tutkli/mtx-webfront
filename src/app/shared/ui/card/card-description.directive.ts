import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const cardDescriptionVariants = cva({
  base: 'text-sm text-muted-foreground',
});
export type CardDescriptionVariants = VariantProps<typeof cardDescriptionVariants>;

@Directive({
  selector: '[mtxCardDescription]',
  standalone: true,
})
export class CardDescriptionDirective implements OnChanges {
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(cardDescriptionVariants({ className: this.class }))
  );

  ngOnChanges() {
    this._class.set(cardDescriptionVariants({ className: this.class }));
  }
}
