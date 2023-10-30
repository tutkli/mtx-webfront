import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';

export const clickInteraction = () => {
  return new Select({
    condition: click,
  });
};
