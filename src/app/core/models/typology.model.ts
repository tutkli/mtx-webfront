export interface Typology {
  id: string;
  color: string;
  description_legend?: string;
  location_type: TypologyLocationType;
  order: number;
  public: boolean;
  typology_description?: string;
  visible_name: string;
  with_description: boolean;
  with_files: boolean;
  with_geolocation_data: boolean;
  with_medias: boolean;
  with_temporality_data: boolean;
  with_authorized_users?: boolean;
}

export enum TypologyLocationType {
  Geolocation = 'geolocation',
  None = 'none',
}

export interface TypologyNode {
  color?: string;
  id: string;
  order: number;
  typology: Typology;
  visible_name: string;
}
