import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';
import { RequestCardComponent } from '@pages/root/pages/list/pages/requests-list/components/request-card/request-card.component';

@Component({
  selector: 'mtx-testing',
  standalone: true,
  imports: [RequestCardComponent],
  template: ` <p>Testing component</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingComponent {
  private _class = hostBinding(
    'attr.class',
    signal(
      'flex h-full w-full flex-col gap-4 p-4 max-h-[calc(100%-53px)] overflow-auto bg-background'
    )
  );
}
