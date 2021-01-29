import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { initialConfigs, render3D } from './_formatMap';
import { restyleCursor, showMarkerModal } from './_mapMarkerEvents';
mapboxgl.accessToken = process.env.MB_TOKEN;

export default function Map() {
  const container = document.getElementById('mainMap');
  const map = new mapboxgl.Map({ container, ...initialConfigs })

  map.on('load', () => render3D(map));
  map.on('click', ({ point }) => showMarkerModal(point, map))
  map.on('mousemove', ({ point }) => restyleCursor(point, map))

}
