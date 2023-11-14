import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ToastComponent } from '@shared/components/toast/toast.component';

@Component({
  selector: 'mtx-toast-container',
  standalone: true,
  imports: [ToastComponent],
  host: {
    class: 'absolute bottom-0 right-0 m-5 w-fit overflow-hidden z-50',
  },
  template: `@for (toast of toasts(); track toast.id) {
    <mtx-toast [toast]="toast" (closed)="remove(toast.id)" />
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);

  toasts = this.toastService.toasts;

  remove(id: string) {
    this.toastService.remove(id);
  }
}
