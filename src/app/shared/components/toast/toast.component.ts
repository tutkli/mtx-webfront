import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { HotToastRef } from '@ngneat/hot-toast';
import { IconName, NgIcon, provideIcons } from '@ng-icons/core';
import {
  AlertDirective,
  AlertVariants,
} from '@shared/ui/alert/alert.directive';
import { AlertTitleDirective } from '@shared/ui/alert/alert-title.directive';
import { AlertDescriptionDirective } from '@shared/ui/alert/alert-description.directive';
import { AlertIconDirective } from '@shared/ui/alert/alert-icon.directive';
import { lucideX } from '@ng-icons/lucide';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { AlertCloseDirective } from '@shared/ui/alert/alert-close.directive';

export interface ToastData {
  title: string;
  description: string;
  type?: AlertVariants['type'];
  icon?: IconName | string;
  dismissable?: boolean;
}

@Component({
  selector: 'mtx-toast',
  standalone: true,
  imports: [
    AlertDirective,
    AlertTitleDirective,
    AlertDescriptionDirective,
    NgIf,
    NgIcon,
    AlertIconDirective,
    ButtonDirective,
    AlertCloseDirective,
    NgClass,
  ],
  providers: [provideIcons({ lucideX })],
  template: `
    <div mtxAlert [type]="hotToastRef.data.type" [class]="alertClass()">
      <ng-icon
        mtxAlertIcon
        *ngIf="hotToastRef.data.icon"
        [name]="hotToastRef.data.icon"
        class="inline-flex h-4 w-4" />
      <h4 mtxAlertTitle>{{ hotToastRef.data.title }}</h4>
      <p mtxAlertDescription>{{ hotToastRef.data.description }}</p>
      <button
        mtxAlertClose
        *ngIf="hotToastRef.data.dismissable"
        (click)="hotToastRef.close()">
        <ng-icon name="lucideX" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  public hotToastRef: HotToastRef<ToastData> = inject(HotToastRef);
  alertClass = computed(() => {
    const klass = [];
    if (this.hotToastRef.data.icon) klass.push('pl-6');
    if (this.hotToastRef.data.dismissable) klass.push('pr-6');

    return klass.join(' ');
  });
}
