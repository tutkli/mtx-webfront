import { Extent } from 'ol/extent';

export const isExtentFinite = (extent: Extent | undefined) => {
  return extent?.every(e => Number.isFinite(e));
};
