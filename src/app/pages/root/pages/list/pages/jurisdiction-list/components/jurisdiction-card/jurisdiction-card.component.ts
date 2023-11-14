import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { CardDescriptionDirective } from '@shared/ui/card/card-description.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CardTitleDirective } from '@shared/ui/card/card-title.directive';
import { Jurisdiction } from '@core/models/jurisdiction.model';
import { AppConfiguration } from '@core/models/app-configuration.model';
import { ShortNumberPipe } from '@shared/pipes/short-number/short-number.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'mtx-jurisdiction-card',
  standalone: true,
  imports: [
    CardDescriptionDirective,
    CardDirective,
    CardTitleDirective,
    ShortNumberPipe,
    TranslocoPipe,
    LowerCasePipe,
  ],
  template: `<div
    mtxCard
    role="button"
    tabindex="0"
    class="flex items-stretch justify-between overflow-hidden transition-all sm:hover:scale-105">
    <div class="flex h-full items-center space-x-4 p-2">
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
          {{ 'label.requests' | transloco | lowercase }}
        </p>
      </div>
    </div>
    <div
      class="flex w-fit flex-col items-center justify-center bg-muted p-2 text-sm text-muted-foreground">
      <span class="text-2xl font-medium">
        {{ requestCountLastDays | shortNumber }}
      </span>
      <span>{{ 'label.requests' | transloco | lowercase }}</span>
      <span class="text-primary">{{ 'list.requests-resolved' | transloco }}</span>
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
