import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import { IconName, NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlertOctagon,
  lucideAlertTriangle,
  lucideCheckCircle2,
  lucideInfo,
  lucideX,
} from '@ng-icons/lucide';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { ToastConfig } from '@core/models/toast.model';
import { ToastTitleDirective } from '@shared/components/toast/toast-title/toast-title.directive';
import { ToastDescriptionDirective } from '@shared/components/toast/toast-description/toast-description.directive';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { toastAnimation } from '@styles/animations/toast.animation';
import { TranslocoPipe } from '@ngneat/transloco';

const toastVariants = cva({
  base: 'relative rounded-lg p-4 flex my-2 max-w-sm bg-background shadow-md transition-all',
  variants: {
    type: {
      success: 'text-green-500',
      info: 'text-foreground',
      warning: 'text-amber-500',
      danger: 'text-warn',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
export type ToastType = 'success' | 'danger' | 'info' | 'warning';

@Component({
  selector: 'mtx-toast',
  standalone: true,
  imports: [
    NgIcon,
    ToastTitleDirective,
    ToastDescriptionDirective,
    ButtonDirective,
    TranslocoPipe,
  ],
  host: {
    role: 'alert',
    '[@state]': 'state()',
  },
  providers: [
    provideIcons({
      lucideX,
      lucideCheckCircle2,
      lucideAlertTriangle,
      lucideInfo,
      lucideAlertOctagon,
    }),
  ],
  template: `
    <div [class]="toastClass()">
      <ng-icon [name]="toastTypeIcon[toast.type]" />

      <div class="flex w-full flex-col px-3">
        @if (toast.titleRef) {
          <h4 mtxToastTitle>{{ toast.titleRef | transloco }}</h4>
        }
        @if (toast.descriptionRef) {
          <h4 mtxToastDescription>{{ toast.descriptionRef | transloco }}</h4>
        }
      </div>

      <button mtxButton type="ghost" class="h-5 w-5 p-0" (click)="closed.emit()">
        <ng-icon name="lucideX" size="1rem" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation],
})
export class ToastComponent implements OnChanges {
  @Input({ required: true }) toast!: ToastConfig;
  @Output() readonly closed = new EventEmitter<void>();

  private toastTimeout: number | undefined;

  protected toastClass = signal('');
  protected state = signal<'opened' | 'closed'>('closed');

  toastTypeIcon: { [k: string]: IconName } = {
    success: 'lucideCheckCircle2',
    danger: 'lucideAlertOctagon',
    warning: 'lucideAlertTriangle',
    info: 'lucideInfo',
  };

  ngOnChanges() {
    this.state.set('opened');
    this.resetTimeout();

    this.toastClass.set(
      toastVariants({
        type: this.toast.type,
        className: this.toast.toastClass,
      })
    );
  }

  private resetTimeout() {
    clearInterval(this.toastTimeout);
    if (this.toast.msTimeout) {
      this.toastTimeout = setTimeout(() => this.closed.emit(), this.toast.msTimeout);
    }
  }
}
