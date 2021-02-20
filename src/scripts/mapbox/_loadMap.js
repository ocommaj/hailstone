import config from './_formatMap';
import mapEvents from './_mapEvents';
import flyCamera from './_flyCamera';

export default async function Map() {
  const container = document.getElementById('mainMap');
  const {
    default: mapboxgl
  } = await import('mapbox-gl/dist/mapbox-gl')

  mapboxgl.accessToken = process.env.MB_TOKEN;

  const { innerWidth, innerHeight } = window;
  container.style.height = `${innerHeight}px`;


  const map = new mapboxgl.Map({ container, ...config.initial });

  map.boxZoom.disable();

  map.on('load', () => config.updateLoaded(map));
  map.on('click', ({ point }) => mapEvents.clickHandler(point, map));
  map.on('mousemove', ({ point }) => mapEvents.moveHandler(point, map));

  window.mapCanvas = { flyCamera: (target) => flyCamera(map, target) }
}
