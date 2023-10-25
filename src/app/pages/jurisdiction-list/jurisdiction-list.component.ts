import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Jurisdiction } from '@core/models/jurisdiction.model';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex w-full flex-col p-4">
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurisdictionListComponent {
  private readonly jurisdictionService = inject(JurisdictionService);

  jurisdictions = this.jurisdictionService.jurisdictions;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this.jurisdictionService.selectJurisdiction(jurisdiction);
  }
}
