import { Fill, Icon, Stroke, Style } from 'ol/style';
import { Request } from '@core/models/request.model';
import { statusNodeImage } from '@core/models/status-node.model';

export const emptyStyle = () => new Style();

export const jurisdictionPerimeterStyle = () =>
  new Style({
    fill: new Fill({ color: 'rgba(113, 113, 122, 0.2)' }),
    stroke: new Stroke({ color: '#171717', width: 1 }),
  });

export const requestMarkerStyle = (request: Request) => {
  const statusNodeStyle = new Style({
    zIndex: 1,
    image: new Icon({
      src: statusNodeImage[request.status_node_type],
      width: 50,
    }),
  });
  const requestImageStyle = new Style({
    zIndex: 2,
    image: new Icon({
      src: request.service_icon ?? 'assets/images/placeholder_image.jpg',
      width: 40,
    }),
  });

  return [statusNodeStyle, requestImageStyle];
};
