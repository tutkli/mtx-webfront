import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Map } from 'ol';
import { hostBinding } from 'ngxtension/host-binding';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'mtx-map-zoom-controls',
  standalone: true,
  imports: [ButtonDirective, NgIcon],
  providers: [provideIcons({ lucidePlus, lucideMinus })],
  template: `<button
      mtxButton
      type="background"
      size="icon"
      class="rounded-none"
      (click)="zoomIn()">
      <ng-icon name="lucidePlus" />
    </button>
    <button
      mtxButton
      type="background"
      size="icon"
      class="rounded-none"
      (click)="zoomOut()">
      <ng-icon name="lucideMinus" />
    </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapZoomControlsComponent {
  protected _class = hostBinding(
    'attr.class',
    signal(
      'absolute top-5 right-5 flex flex-col bg-background rounded-lg z-10 overflow-hidden divide-border divide-y shadow-md'
    )
  );

  @Input({ required: true }) map!: Map;

  getCurrentZoom(): number {
    return this.map.getView().getZoom() ?? 0;
  }

  zoomIn(): void {
    this.map.getView().setZoom(this.getCurrentZoom() + 1);
  }

  zoomOut(): void {
    this.map.getView().setZoom(this.getCurrentZoom() - 1);
  }
}
