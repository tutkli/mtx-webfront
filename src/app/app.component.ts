import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <span class="content">{{ title }}</span>
  `,
  styles: [],
})
export class AppComponent {
  title = 'mtx-webfront';
}
