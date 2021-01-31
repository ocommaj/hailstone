import SunCalc from 'suncalc';

const bounds = [ [151.382659, 7.118231], [152.072039, 7.727652] ];

export const initialConfigs = {
  zoom: 13.25,
  center: [151.83, 7.427],
  pitch: 75,
  bearing: 125,
  maxZoom: 16,
  minZoom: 11,
  maxBounds: bounds,
  style: process.env.MB_STYLE,
}

const Config = {
  initial: initialConfigs,
  render3D
}

export default Config;

export function render3D(map) {
  addTerrainSource(map);
  addSkyLayer(map);
}

function addTerrainSource(map) {
    map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 16,
    })
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
}

function addSkyLayer(map) {
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

  function setSunPosition() {
    const { lat, lng } = map.getCenter()
    const { sunrise } = SunCalc.getTimes( Date.now(), lat, lng );
    const sunPos = SunCalc.getPosition(sunrise, lat, lng);
    const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
    const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
  }
}
