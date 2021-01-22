import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
mapboxgl.accessToken = process.env.MB_TOKEN;

export default function Map() {
  const container = document.getElementById('mainMap');
  const map = new mapboxgl.Map({
    container,
    zoom: 14,
    center: [151.825, 7.415],
    pitch: 80,
    bearing: 70,
    style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
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
               'sky-atmosphere-color': 'blue',
               'sky-atmosphere-halo-color': 'white',
               'sky-type': 'atmosphere',
               'sky-atmosphere-sun': [270, 65],
               'sky-opacity': .5,
               'sky-atmosphere-sun-intensity': 75
           }
       });
  });
}
