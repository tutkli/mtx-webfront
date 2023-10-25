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
    signal('flex w-full flex-col p-4 max-h-full overflow-auto')
  );
  private readonly jurisdictionService = inject(JurisdictionService);

  jurisdictions = this.jurisdictionService.jurisdictions;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this.jurisdictionService.selectJurisdiction(jurisdiction);
  }
}
