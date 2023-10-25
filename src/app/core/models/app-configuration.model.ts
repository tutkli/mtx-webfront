export interface AppConfiguration {
  jurisdiction_id: string;
  app_blackandwhite_icon_url: string;
  app_icon_url: string;
  default_language: string;
  headboard: AppConfigurationHeadboard;
  main_color: string;
  name: string;
  type: string;
}

export interface AppConfigurationHeadboard {
  type: string;
}
