import { Directive, Input, OnChanges, signal } from '@angular/core';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const cardVariants = cva({
  base: 'rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card-foreground shadow-sm',
});
export type CardVariants = VariantProps<typeof cardVariants>;

@Directive({
  selector: '[mtxCard]',
  standalone: true,
})
export class CardDirective implements OnChanges {
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(cardVariants({ className: this.class }))
  );

  ngOnChanges() {
    this._class.set(cardVariants({ className: this.class }));
  }
}
