import { Component } from '@angular/core';
import { ToolbarComponent } from '@shared/ui/toolbar/toolbar.component';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [ToolbarComponent],
  template: `<div class="h-screen w-screen">
    <mtx-toolbar color="primary">
      <span>Mejora tu ciudad</span>
    </mtx-toolbar>
  </div>`,
  styles: [],
})
export class AppComponent {}
