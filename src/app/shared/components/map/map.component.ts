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
import { Feature, Map, Overlay, View } from 'ol';
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
import { isJurisdictionFeature, isRequestFeature } from '@utils/map/map-features.utils';
import { MapZoomControlsComponent } from '@shared/components/map-zoom-controls/map-zoom-controls.component';
import { NgComponentOutlet } from '@angular/common';
import { RequestCardComponent } from '@pages/root/pages/list/pages/requests-list/components/request-card/request-card.component';
import { isExtentFinite } from '@utils/map/map-source.utils';
import { Extent } from 'ol/extent';

@Component({
  selector: 'mtx-map',
  standalone: true,
  imports: [MapZoomControlsComponent, NgComponentOutlet],
  template: `
    @if (showControls()) {
      <mtx-map-zoom-controls [map]="map" />
    }

    <div id="ol-map" class="relative h-full w-full"></div>
    <div
      #requestPopup
      class="absolute min-w-[300px] shadow-sm"
      (mouseenter)="overlayHovered.set(true)"
      (mouseleave)="overlayHovered.set(false)">
      @if (highlightedRequest()) {
        <ng-container
          *ngComponentOutlet="
            RequestCardComponent;
            inputs: { request: highlightedRequest() }
          " />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  private readonly requestService = inject(RequestService);
  private readonly jurisdictionService = inject(JurisdictionService);

  protected readonly RequestCardComponent = RequestCardComponent;

  private jurisdictions = this.jurisdictionService.jurisdictions;
  private selectedJurisdiction = this.jurisdictionService.selectedJurisdiction;
  private requests = this.requestService.requests;
  protected highlightedRequest = this.requestService.highlightedRequest;

  @ViewChild('requestPopup') requestPopupElement!: ElementRef<HTMLDivElement>;

  map!: Map;
  requestOverlay: Overlay | undefined;
  tileLayer: TileLayer<OSM> | undefined;
  jurisdictionLayer: VectorLayer<VectorSource> | undefined;
  requestsLayer: VectorLayer<VectorSource> | undefined;
  showControls = signal(false);
  overlayHovered = signal(false);

  ngAfterViewInit(): void {
    this.initMap();
    this.initLayers();
    this.initRequestOverlay();
    this.addClickInteraction();
    this.addHoverInteraction();
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
      if (isExtentFinite(jurisdictionExtent)) {
        this.fitMapToExtent(jurisdictionExtent);
      }
    }
  });

  private fitToSelectedRequest = effect(() => {
    const selectedRequest = this.requestService.selectedRequest();
    if (selectedRequest) {
      const requestFeature = this.requestsLayer
        ?.getSource()
        ?.getFeatureById(selectedRequest.token);
      const featureExtent = requestFeature?.getGeometry()?.getExtent();
      if (isExtentFinite(featureExtent)) {
        this.fitMapToExtent(featureExtent);
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
    if (!this.requests().length || !this.selectedJurisdiction()) {
      this.requestsLayer?.getSource()?.clear();
      return;
    }

    const markers = this.requests().map(request => {
      const marker = new Feature({
        geometry: new Point([request.long, request.lat]),
        request,
      });

      marker.setId(request.token);
      marker.setStyle(requestMarkerStyle(request));
      return marker;
    });

    this.requestsLayer?.getSource()?.addFeatures(markers);
    this.fitToRequestMarkers();
  });

  private showRequestPopup = effect(() => {
    const highlightedRequest = this.highlightedRequest();

    if (highlightedRequest) {
      this.requestOverlay?.setPosition([highlightedRequest.long, highlightedRequest.lat]);
    } else {
      this.requestOverlay?.setPosition(undefined);
    }
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
        maxZoom: 18,
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

  private initRequestOverlay() {
    this.requestOverlay = new Overlay({
      element: this.requestPopupElement.nativeElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    this.map.addOverlay(this.requestOverlay);
  }

  private fitMapToExtent(extent: Extent | undefined) {
    if (!extent) return;

    this.map.getView().fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
  }

  private addClickInteraction() {
    this.map.on('click', event => {
      const feature = this.map.getFeaturesAtPixel(event.pixel)?.[0];

      if (!feature) {
        return;
      } else if (isJurisdictionFeature(feature)) {
        this.jurisdictionService.updateJurisdiction(feature.get('jurisdiction'));
      } else if (isRequestFeature(feature)) {
        this.requestService.selectRequest(feature.get('request'));
      }
    });
  }

  private addHoverInteraction() {
    this.map.on('pointermove', e => {
      const hoveredFeatures = this.map.getFeaturesAtPixel(e.pixel);
      if (
        hoveredFeatures.length &&
        isRequestFeature(hoveredFeatures[0]) &&
        !this.overlayHovered()
      ) {
        this.requestService.highlightRequest(hoveredFeatures[0].get('request'));
      } else if (!this.overlayHovered()) {
        this.requestService.highlightRequest();
      }
    });
  }
}
