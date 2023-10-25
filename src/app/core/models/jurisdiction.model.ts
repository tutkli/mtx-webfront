import { Typology, TypologyNode } from './typology.model';
import { AppUrls } from './app-urls.model';
import { Button } from './button.model';
import { Channel } from './channel.model';
import { LatLng } from './geo.model';
import { JurisdictionElement } from './jurisdiction-element.model';
import { MapLayer } from './map-layer.model';
import { Locale } from './locale.model';
import { OriginDevice } from './origin-device.model';
import { UserInfo } from './user.model';
import { Tag } from './tag.model';

export interface Jurisdiction {
  id: string;
  jurisdiction_elements: JurisdictionElement[];
  jurisdiction_id: string;
  only_registered_users: boolean;
  max_upload_files?: number;
  automatic_typology: boolean;
  map_layers: MapLayer[];
  accepted_id_documents: any[];
  buttons: Button[];
  channels: Channel[];
  geo_bound: LatLng[];
  geo_perimeter: LatLng[];
  icon: string;
  key_name?: string;
  locales: Locale[];
  name: string;
  origin_devices: OriginDevice[];
  lat: number;
  long: number;
  tags: Tag[];
  timezone: Timezone;
  typologies: Typology[];
  typology_nodes: TypologyNode[];
  user_info: UserInfo[];
  modules: { [key: string]: boolean };
  app_urls?: AppUrls;
  company_emails?: string[];
  third_emails?: string[];
  max_export_requests?: number;
}

export enum Timezone {
  AmericaMexicoCity = 'America/Mexico_City',
  EuropeMadrid = 'Europe/Madrid',
}
