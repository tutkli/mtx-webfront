import { LocationAdditionalData } from './location-additional-data.model';
import { MapLayer } from './map-layer.model';

export interface JurisdictionElement {
  map_layers: MapLayer[];
  extent: number[];
  id: string;
  name: string;
  type: JurisdictionElementType;
  visible_name: string;
  location_additional_data?: LocationAdditionalData;
  guided_module?: boolean;
}

export enum JurisdictionElementType {
  Building = 'building',
  City = 'city',
}
