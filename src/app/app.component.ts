import { Component, inject } from '@angular/core';
import { JurisdictionApiService } from './core/api/jurisdiction/jurisdiction-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'mtx-root',
  standalone: true,
  imports: [NgForOf],
  template: `
    <span class="content">Mejora tu Ciudad</span>
    <div *ngFor="let jurisdiction of jurisdictions()">
      {{ jurisdiction.name }}
    </div>
  `,
  styles: [],
})
export class AppComponent {
  private readonly jurisdictionApiService = inject(JurisdictionApiService);

  jurisdictions = toSignal(this.jurisdictionApiService.getJurisdictions());
}
