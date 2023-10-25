import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Map, View } from 'ol';

@Component({
  selector: 'mtx-map',
  standalone: true,
  imports: [],
  template: `<div id="ol-map" class="h-full w-full"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @ViewChild('ol-map') mapElement!: ElementRef<HTMLDivElement>;
  map: Map;

  constructor() {
    useGeographic();
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  ngAfterViewInit(): void {
    const tileLayer = new TileLayer({ source: new OSM() });
    this.map.setLayers([tileLayer]);
    this.map.setTarget('ol-map');
  }
}
