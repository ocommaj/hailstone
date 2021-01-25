import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
mapboxgl.accessToken = process.env.MB_TOKEN;

export default function Map() {
  const container = document.getElementById('mainMap');
  const map = new mapboxgl.Map({
    container,
    zoom: 13.25,
    center: [151.83, 7.427],
    pitch: 75,
    bearing: 125,
    style: 'mapbox://styles/jfo713/ckkcya24511r717ry3ok8vr9h'
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
            'sky-atmosphere-sun': [270, 65],
           }
       });
  });

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [ 'wreckLocations' ]
    });

    if (!features.length) return;
    const feature = features[0];
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<h2>${feature.properties.title}</h2>`)
      .addTo(map)
  })
}
