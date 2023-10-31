import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardSkeletonComponent } from '@shared/components/card-skeleton/card-skeleton.component';
import { Repeat } from 'ngxtension/repeat';

@Component({
  selector: 'mtx-list-skeleton',
  standalone: true,
  imports: [CardSkeletonComponent, Repeat],
  template: `
    <div class="relative flex flex-col space-y-2">
      <mtx-card-skeleton *ngFor="let i; repeat: 5" />
      <div class="absolute -bottom-10 h-24 w-full bg-background blur-lg"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSkeletonComponent {}
