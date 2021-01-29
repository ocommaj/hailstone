import WreckModal from '../modals';

const wreckLabels = [
  'wreckLocations',
  'wreckNames',
  'depths_avg',
  'depths_max',
  'vesselLength',
  'vesselType'
]

export function showMarkerModal(point, map) {
  const directoryName = 'yamagiriMaru'
  window.firebaseClient.loadGallery({ directoryName })
  const features = map.queryRenderedFeatures(point, { layers: wreckLabels });

  if (!features.length) return;
  const feature = features[0];
  const wreck = feature.properties;
  WreckModal(wreck, point);
}

export function restyleCursor(point, map) {
  const features = map.queryRenderedFeatures(point, { layers: wreckLabels });
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
}
