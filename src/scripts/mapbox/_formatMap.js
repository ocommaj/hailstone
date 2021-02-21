import wreckData from '../../assets/wreckLocations.json';
import SunCalc from 'suncalc';

const bounds = [ [151.382659, 7.118231], [152.072039, 7.727652] ];
const centerDefaults = {
  wide: {
    center: [151.83, 7.427],
    zoom: 13.25,
    bearing: 125,
  },
  narrow: {
    center: [151.80, 7.4],
    zoom: 12.05,
    bearing: 125,
  },
  zoomedIn: 15,
}

const initialConfigs = {
  maxZoom: 16,
  minZoom: 11,
  maxBounds: bounds,
  style: process.env.MB_STYLE,
  ...setInitialCamera()
}

const Config = { updateLoaded, render3D, initial: initialConfigs }

export default Config;

function updateLoaded(map) {
  render3D(map);
  updateMapboxLinkElements();
}

function setInitialCamera() {
  const { center, zoom, bearing } = getCenter()
  return {
    center,
    zoom,
    bearing,
    pitch: 75,
  }

  function getCenter() {
    const { screen: { width, height }, location: { search } } = window;
    const queryParams  = new URLSearchParams(search);
    if (queryParams.has('vesselId')) {
      const queriedVessel = queryParams.get('vesselId');
      return lookupVesselLocation(queriedVessel);
    } else {
      return (width > height) ? centerDefaults.wide : centerDefaults.narrow;
    }

    function lookupVesselLocation(vesselId) {
      const { features } = wreckData;
      const vessel = features.filter(ft => ft.properties.id === vesselId);
      const center = vessel[0].geometry.coordinates;
      const zoom = centerDefaults.zoomedIn;
      const bearing = 0;
      return { center, zoom, bearing }
    }
  }

}

function render3D(map) {
    addSkyLayer(map);
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

function addAriaRoles() {
  const mbCtrlList = document.querySelector('.mapboxgl-ctrl-attrib-inner');
  [...mbCtrlList.children].forEach((aTagElem) => {
    aTagElem.setAttribute('role', 'listitem')
  })
}

function updateMapboxLinkElements() {
  const mbCtrlList = document.querySelector('.mapboxgl-ctrl-attrib-inner');
  [...mbCtrlList.children].forEach((aTagElem) => {
    addAriaRole(aTagElem)
    makeExternalLinkSafer(aTagElem)
  })

  function addAriaRole(element) {
    element.setAttribute('role', 'listitem')
  }

  function makeExternalLinkSafer(element) {
    element.setAttribute('rel', 'noreferrer')
  }
}
