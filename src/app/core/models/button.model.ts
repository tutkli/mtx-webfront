export interface Button {
  design: ButtonDesign;
  icon: string;
  button_code: string;
  label: string;
  news_collection: any[];
  optional: boolean;
  phone_collection: any[];
  sequence: number;
  social_collection: any[];
  type: string;
  url: string;
  url_collection: any[];
}

export interface ButtonDesign {
  icon: { color: string };
  background: { color: string };
  size: number;
  color: string;
  format: string;
  char: string;
}
