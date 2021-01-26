import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import SunCalc from 'suncalc';
import { restyleCursor, showMarkerPopup } from './_mapMarkerEvents';
mapboxgl.accessToken = process.env.MB_TOKEN;

export default function Map() {
  const container = document.getElementById('mainMap');
  const map = new mapboxgl.Map({
    container,
    zoom: 13.25,
    center: [151.83, 7.427],
    pitch: 75,
    bearing: 125,
    style: 'mapbox://styles/jfo713/ckkddvzci04es17tej19qwxt7'
  })

  map.on('load', function () {
    map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
    })

    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

    map.addLayer({
           'id': 'sky',
           'type': 'sky',
           'paint': {
             'sky-opacity': [
               'interpolate',
               ['linear'],
               ['zoom'],
               0,
               0,
               5,
               0.3,
               8,
               1
             ],
            'sky-atmosphere-color': '#4589ff',
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': setSunPosition()
           }
       });
  });

  map.on('click', ({ point }) => showMarkerPopup(point, map))
  map.on('mousemove', ({ point }) => restyleCursor(point, map))

  function setSunPosition() {
    const { lat, lng } = map.getCenter()
    const { sunrise } = SunCalc.getTimes( Date.now(), lat, lng );
    const sunPos = SunCalc.getPosition(sunrise, lat, lng);
    const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
    const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
  }

}
