import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mtx-list',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}
