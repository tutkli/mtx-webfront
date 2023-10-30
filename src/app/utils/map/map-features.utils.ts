import { FeatureLike } from 'ol/Feature';

export const isJurisdictionFeature = (feature: FeatureLike) => {
  return !!feature.get('jurisdiction');
};

export const isRequestFeature = (feature: FeatureLike) => {
  return !!feature.get('request');
};
