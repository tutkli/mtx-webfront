import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { hostBinding } from 'ngxtension/host-binding';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="mb-4 text-xl font-semibold text-primary">
      Listado de jurisdicciones
    </h1>
    <button
      *ngFor="let jurisdiction of jurisdictions()"
      (click)="selectJurisdiction(jurisdiction)"
      class="border border-border p-2">
      <img
        [src]="jurisdiction.icon"
        [alt]="jurisdiction.name + ' icon'"
        width="50"
        height="50" />
      <span>{{ jurisdiction.name }}</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurisdictionListComponent {
  private hostClass = hostBinding(
    'attr.class',
    signal('flex w-full flex-col p-4 max-h-[calc(100%-52px)] overflow-auto')
  );
  private readonly jurisdictionService = inject(JurisdictionService);

  jurisdictions = this.jurisdictionService.jurisdictions;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this.jurisdictionService.selectJurisdiction(jurisdiction);
  }
}
