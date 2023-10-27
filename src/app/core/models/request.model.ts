import { Typology } from '@core/models/typology.model';
import { JurisdictionElement } from '@core/models/jurisdiction-element.model';
import { User } from '@core/models/user.model';
import { StatusNode, StatusNodeType } from '@core/models/status-node.model';
import { Tag } from '@core/models/tag.model';

export interface Request {
  service_id: string;
  service_icon: string;
  service_name: string;
  requested_datetime: Date;
  jurisdiction_id: string;
  status_node_type: StatusNodeType;
  typology: Typology;
  address: string;
  comments_count: number;
  complaints_count: number;
  current_node_estimated_final_datetime: Date;
  current_node_estimated_start_datetime: Date;
  description: string;
  estimated_final_datetime: Date;
  estimated_start_datetime: Date;
  evaluation: number;
  jurisdiction_element: JurisdictionElement;
  address_string?: string;
  lat: number;
  long: number;
  reiterations_count: number;
  service_request_id: string;
  status_node: StatusNode;
  tags: Tag[];
  token: string;
  worknotes_count: number;
  media_url?: string;
  user?: User;
}
