import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import { Feature, Map, View } from 'ol';
import { RequestService } from '@core/services/request/request.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { JurisdictionService } from '@core/services/jurisdiction/jurisdiction.service';
import { Point, Polygon } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import {
  emptyStyle,
  jurisdictionPerimeterStyle,
  requestMarkerStyle,
} from '@utils/map/map-styles.utils';
import { useGeographic } from 'ol/proj';
import { isJurisdictionFeature } from '@utils/map/map-features.utils';
import { MapZoomControlsComponent } from '@shared/components/map-zoom-controls/map-zoom-controls.component';
import { NgIf } from '@angular/common';
import { SidenavControlComponent } from '@shared/components/sidenav-control/sidenav-control.component';

@Component({
  selector: 'mtx-map',
  standalone: true,
  imports: [MapZoomControlsComponent, NgIf, SidenavControlComponent],
  template: `
    <mtx-map-zoom-controls *ngIf="showControls()" [map]="map" />
    <div id="ol-map" class="relative h-full w-full"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  private readonly requestService = inject(RequestService);
  private readonly jurisdictionService = inject(JurisdictionService);

  private jurisdictions = this.jurisdictionService.jurisdictions;
  private selectedJurisdiction = this.jurisdictionService.selectedJurisdiction;
  private requests = this.requestService.requests;

  showControls = signal(false);

  @ViewChild('ol-map') mapElement!: ElementRef<HTMLDivElement>;
  map!: Map;
  tileLayer: TileLayer<OSM> | undefined;
  jurisdictionLayer: VectorLayer<VectorSource> | undefined;
  requestsLayer: VectorLayer<VectorSource> | undefined;

  ngAfterViewInit(): void {
    this.initMap();
    this.initLayers();
    this.addClickInteraction();
    this.showControls.set(true);
  }

  private loadJurisdictionMapLayers = effect(() => {
    if (!this.jurisdictions().length) return;

    for (const jurisdiction of this.jurisdictions()) {
      const coordinates: Coordinate[] = jurisdiction.geo_perimeter.map(latLong => [
        latLong.long,
        latLong.lat,
      ]);
      const jurisdictionPolygon = new Polygon([coordinates]);
      const jurisdictionFeature = new Feature({
        geometry: jurisdictionPolygon,
        jurisdiction,
      });
      jurisdictionFeature.setStyle(jurisdictionPerimeterStyle());

      this.jurisdictionLayer?.getSource()?.addFeature(jurisdictionFeature);
    }
  });

  private fitToJurisdictions = effect(() => {
    if (this.jurisdictions().length && !this.selectedJurisdiction()) {
      const jurisdictionExtent = this.jurisdictionLayer?.getSource()?.getExtent();
      if (jurisdictionExtent?.every(e => Number.isFinite(e))) {
        this.map
          .getView()
          .fit(jurisdictionExtent, { duration: 500, padding: [100, 100, 100, 100] });
      }
    }
  });

  private handleJurisdictionLayerVisibility = effect(() => {
    if (this.selectedJurisdiction()) {
      this.jurisdictionLayer?.getSource()?.forEachFeature(feature => {
        if (feature.get('jurisdiction').id !== this.selectedJurisdiction()?.id) {
          feature.setStyle(emptyStyle());
        }
      });
    } else {
      this.jurisdictionLayer?.getSource()?.forEachFeature(feature => {
        feature.setStyle(jurisdictionPerimeterStyle());
      });
    }
  });

  private loadRequestMarkers = effect(() => {
    if (this.requests.length || !this.selectedJurisdiction()) {
      this.requestsLayer?.getSource()?.clear();
      return;
    }

    const markers = this.requests().map(request => {
      const marker = new Feature({
        geometry: new Point([request.long, request.lat]),
        request,
      });

      marker.setStyle(requestMarkerStyle(request));
      return marker;
    });

    this.requestsLayer?.getSource()?.addFeatures(markers);
    this.fitToRequestMarkers();
  });

  private fitToRequestMarkers() {
    const requestsExtent = this.requestsLayer?.getSource()?.getExtent();
    if (requestsExtent?.every(e => Number.isFinite(e))) {
      this.map
        .getView()
        .fit(requestsExtent, { duration: 500, padding: [100, 100, 100, 100] });
    }
  }

  private initMap(): void {
    useGeographic();
    this.map = new Map({
      target: 'ol-map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
      layers: [],
    });
  }

  private initLayers(): void {
    this.tileLayer = new TileLayer({
      zIndex: 0,
      source: new XYZ({
        url: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      }),
    });

    this.jurisdictionLayer = new VectorLayer({
      zIndex: 1,
      source: new VectorSource({
        features: [],
      }),
    });

    this.requestsLayer = new VectorLayer({
      zIndex: 2,
      source: new VectorSource({
        features: [],
      }),
    });
    this.map.setLayers([this.tileLayer, this.jurisdictionLayer, this.requestsLayer]);
  }

  private addClickInteraction() {
    this.map.on('click', event => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, feature => {
        return feature;
      });

      if (!feature) {
        return;
      }

      if (isJurisdictionFeature(feature)) {
        this.jurisdictionService.updateJurisdiction(feature.get('jurisdiction'));
      }
    });
  }
}
