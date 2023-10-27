import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CardDescriptionDirective } from '@shared/ui/card/card-description.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CardTitleDirective } from '@shared/ui/card/card-title.directive';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { AppConfiguration } from '@core/models/app-configuration.model';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';

@Component({
  selector: 'mtx-jurisdiction-card',
  standalone: true,
  imports: [
    CardDescriptionDirective,
    CardDirective,
    CardTitleDirective,
    NgForOf,
    ShortNumberPipe,
  ],
  template: ` <div
    mtxCard
    role="button"
    tabindex="0"
    class="flex h-24 justify-between overflow-hidden transition-all hover:scale-105">
    <div class=" flex items-center space-x-4 p-2">
      <img
        [src]="appConfiguration?.app_icon_url"
        [alt]="jurisdiction.name + ' icon'"
        width="50"
        height="50" />
      <div class="space-y-2">
        <h3 mtxCardTitle>{{ jurisdiction.name }}</h3>
        <p mtxCardDescription>{{ jurisdiction.key_name }}</p>
        <p mtxCardDescription>
          <span class="font-semibold">
            {{ requestCount | shortNumber }}
          </span>
          reportes
        </p>
      </div>
    </div>
    <div
      class="flex h-full w-fit flex-col items-center justify-center self-end bg-muted p-2 text-sm text-muted-foreground">
      <span class="text-2xl font-medium">
        {{ requestCountLastDays | shortNumber }}
      </span>
      <span>reportes</span>
      <span class="text-primary">SOLUCIONADOS</span>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurisdictionCardComponent {
  @Input({ required: true }) jurisdiction!: Jurisdiction;
  @Input() requestCount: number | undefined;
  @Input() requestCountLastDays: number | undefined;
  @Input() appConfiguration: AppConfiguration | undefined;
}
