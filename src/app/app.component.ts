import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from '@shared/components/toast-container/toast-container.component';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet /> <mtx-toast-container />`,
})
export class AppComponent {}
