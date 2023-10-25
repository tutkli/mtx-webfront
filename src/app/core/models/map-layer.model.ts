export interface MapLayer {
  backend: MapLayerBackend;
  endpoint: string;
  id: string;
  is_default: boolean;
  internal_name: string;
  name: string;
  preset: boolean;
  public: boolean;
  search_layer?: boolean;
  tags: any[];
  token: string;
  type: MapLayerType;
}

export enum MapLayerBackend {
  Ows = 'OWS',
}

export enum MapLayerType {
  Administrative = 'ADMINISTRATIVE',
  Work = 'WORK',
}
