import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Feature, Map, View } from 'ol';
import { RequestService } from '@core/services/request/request.service';
import { Point } from 'ol/geom';
import { Request } from '@core/models/request.model';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'mtx-map',
  standalone: true,
  imports: [],
  template: `<div id="ol-map" class="h-full w-full"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  private readonly requestService = inject(RequestService);

  @ViewChild('ol-map') mapElement!: ElementRef<HTMLDivElement>;
  map: Map;
  iconStyle: Style;
  tileLayer: TileLayer<OSM>;
  requestsLayer: VectorLayer<VectorSource>;

  constructor() {
    useGeographic();

    this.iconStyle = new Style({
      image: new Icon({
        src: 'assets/images/map-marker.png',
        width: 30,
      }),
    });

    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    this.tileLayer = new TileLayer({ source: new OSM() });
    this.requestsLayer = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
    });

    effect(() => {
      this.loadRequestMarkers(this.requestService.requests());
      this.zoomToRequests();
    });
  }

  ngAfterViewInit(): void {
    this.map.setLayers([this.tileLayer, this.requestsLayer]);
    this.map.setTarget('ol-map');
  }

  private loadRequestMarkers(requests: Request[]) {
    const markers = requests.map(request => {
      const marker = new Feature({
        geometry: new Point([request.long, request.lat]),
        request,
      });

      marker.setStyle(this.iconStyle);
      return marker;
    });

    this.requestsLayer.getSource()?.addFeatures(markers);
  }

  zoomToRequests(): void {
    const extent = this.requestsLayer.getSource()?.getExtent();
    if (extent?.every(e => Number.isFinite(e))) {
      this.map.getView().fit(extent, { duration: 500 });
    }
  }
}
