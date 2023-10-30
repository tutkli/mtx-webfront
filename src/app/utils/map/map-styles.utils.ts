import { Fill, Icon, Stroke, Style } from 'ol/style';

export const emptyStyle = () => new Style();

export const jurisdictionPerimeterStyle = () =>
  new Style({
    fill: new Fill({ color: 'rgba(113, 113, 122, 0.2)' }),
    stroke: new Stroke({ color: '#171717', width: 1 }),
  });

export const requestMarkerStyle = () => {
  return new Style({
    image: new Icon({
      src: 'assets/images/map-marker.png',
      width: 30,
    }),
  });
};
