import { animate, state, style, transition, trigger } from '@angular/animations';

export const toastAnimation = trigger('state', [
  state('opened', style({ transform: 'translateY(0%)' })),
  state('void, closed', style({ transform: 'translateY(100%)', opacity: 0 })),
  transition('* => *', animate('200ms ease-in')),
]);
