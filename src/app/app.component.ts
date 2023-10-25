import { Component } from '@angular/core';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [ToolbarComponent],
  template: `<div class="w-screen h-screen">
    <mtx-toolbar>
      <span>Mejora tu ciudad</span>
    </mtx-toolbar>
  </div>`,
  styles: [],
})
export class AppComponent {}
