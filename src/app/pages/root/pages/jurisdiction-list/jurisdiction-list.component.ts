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
import { CardDirective } from '@shared/ui/card/card.directive';
import { CardTitleDirective } from '@shared/ui/card/card-title.directive';
import { CardDescriptionDirective } from '@shared/ui/card/card-description.directive';
import { AppConfigurationService } from '@core/services/app-configuration/app-configuration.service';

@Component({
  selector: 'mtx-jurisdiction-list',
  standalone: true,
  imports: [
    CommonModule,
    CardDirective,
    CardTitleDirective,
    CardDescriptionDirective,
  ],
  template: `
    <h1 class="mb-4 text-xl font-semibold text-primary">
      Listado de jurisdicciones
    </h1>
    <div class="flex flex-col space-y-2">
      <div
        mtxCard
        role="button"
        tabindex="0"
        class="flex items-center space-x-2 p-2"
        *ngFor="let jurisdiction of jurisdictions()"
        (click)="selectJurisdiction(jurisdiction)">
        <img
          [src]="
            appConfigurationsByService().get(jurisdiction.jurisdiction_id)
              ?.app_icon_url
          "
          [alt]="jurisdiction.name + ' icon'"
          width="50"
          height="50" />
        <div class="space-y-2">
          <h3 mtxCardTitle>{{ jurisdiction.name }}</h3>
          <p mtxCardDescription>{{ jurisdiction.key_name }}</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurisdictionListComponent {
  private hostClass = hostBinding(
    'attr.class',
    signal(
      'flex h-full w-full flex-col p-4 max-h-[calc(100%-53px)] overflow-auto bg-background'
    )
  );
  private readonly jurisdictionService = inject(JurisdictionService);
  private readonly appConfigurationService = inject(AppConfigurationService);

  jurisdictions = this.jurisdictionService.jurisdictions;
  appConfigurationsByService =
    this.appConfigurationService.appConfigurationsByService;

  selectJurisdiction(jurisdiction: Jurisdiction): void {
    this.jurisdictionService.selectJurisdiction(jurisdiction);
  }
}
