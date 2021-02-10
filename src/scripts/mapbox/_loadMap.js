import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import config from './_formatMap';
import mapEvents from './_mapEvents';
import flyCamera from './_flyCamera';
mapboxgl.accessToken = process.env.MB_TOKEN;

export default function Map() {
  const container = document.getElementById('mainMap');
  const map = new mapboxgl.Map({ container, ...config.initial });

  map.boxZoom.disable();

  map.on('load', () => config.render3D(map));
  map.on('click', ({ point }) => mapEvents.clickHandler(point, map));
  map.on('mousemove', ({ point }) => mapEvents.moveHandler(point, map));

  this.flyCamera = (target) => flyCamera(map, target);
}
