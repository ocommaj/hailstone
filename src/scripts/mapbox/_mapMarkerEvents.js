import { Popup } from 'mapbox-gl/dist/mapbox-gl';

export function showMarkerPopup(point, map) {
  const features = map.queryRenderedFeatures(point, {
    layers: [ 'wreckLocations' ]
  });

  if (!features.length) return;
  const feature = features[0];
  const popup = new Popup({
    offset: [0, -15],
    focusAfterOpen: false,
    closeButton: false,
  })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<h2>${feature.properties.title}</h2>`)
    .addTo(map)
}

export function restyleCursor(point, map) {
  const features = map.queryRenderedFeatures(point, {
    layers: [ 'wreckLocations' ]
  });
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
}
