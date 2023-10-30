import { Fill, Icon, Stroke, Style } from 'ol/style';

export const emptyStyle = () => new Style();

export const jurisdictionPerimeterStyle = () =>
  new Style({
    fill: new Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
    stroke: new Stroke({ color: '#ef4444', width: 2 }),
  });

export const requestMarkerStyle = () => {
  return new Style({
    image: new Icon({
      src: 'assets/images/map-marker.png',
      width: 30,
    }),
  });
};
