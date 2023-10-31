import { Directive, Input, OnChanges, signal } from '@angular/core';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';
import { cva } from '@utils/cva';

const buttonVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  variants: {
    type: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      warn: 'bg-warn text-warn-foreground hover:bg-warn/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-secondary hover:text-secondary-foreground',
      background:
        'bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
    },
    size: {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'default',
  },
});
type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[mtxButton]',
  standalone: true,
})
export class ButtonDirective implements OnChanges {
  @Input() type: ButtonVariants['type'] = 'default';
  @Input() size: ButtonVariants['size'] = 'default';
  @Input() class = '';

  private _class = hostBinding(
    'attr.class',
    signal(
      buttonVariants({
        type: this.type,
        size: this.size,
        className: this.class,
      })
    )
  );

  ngOnChanges() {
    this._class.set(
      buttonVariants({
        type: this.type,
        size: this.size,
        className: this.class,
      })
    );
  }
}
