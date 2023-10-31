import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';
import { IconName, NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  lucideAlertCircle,
  lucideFilter,
  lucideList,
  lucideSettings,
  lucideUser2,
} from '@ng-icons/lucide';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'mtx-navigation-buttons',
  standalone: true,
  imports: [NgIcon, RouterLink, RouterLinkActive, NgForOf],
  providers: [
    provideIcons({
      lucideList,
      lucideUser2,
      lucideAlertCircle,
      lucideSettings,
      lucideFilter,
    }),
  ],
  template: `<button
    *ngFor="let item of navigationItems"
    role="button"
    [routerLink]="item.link"
    routerLinkActive="active-route"
    class="navigation-button">
    <ng-icon [name]="item.icon" size="1.5rem" />
  </button>`,
  styles: [
    `
      .navigation-button {
        @apply inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50;
      }
      .active-route {
        @apply bg-background text-primary shadow-sm;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonsComponent {
  _class = hostBinding(
    'attr.class',
    signal(
      'w-full border-b border-border shadow-sm inline-flex items-center justify-center bg-muted p-2 text-muted-foreground'
    )
  );

  navigationItems: { link: string; icon: IconName }[] = [
    { link: '/list', icon: 'lucideList' },
    { link: '/testing', icon: 'lucideUser2' },
    { link: '/new', icon: 'lucideAlertCircle' },
    { link: '/settings', icon: 'lucideSettings' },
    { link: '/filter', icon: 'lucideFilter' },
  ];
}
