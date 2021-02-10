import WreckModal from '../modals';

const wreckLabels = [
  'wreckLocations',
  'wreckNames',
  'depths_avg',
  'depths_max',
  'vesselLength',
  'vesselType'
]

const eventHandlers = {
  clickHandler,
  getWreckAtCenter,
  moveHandler: restyleCursor,
}

export default eventHandlers;

function restyleCursor(point, map) {
  const features = map.queryRenderedFeatures(point, { layers: wreckLabels });
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
}

function clickHandler(point, map) {
  const activeModal = window.activeModal;
  const features = map.queryRenderedFeatures(point, { layers: wreckLabels });
  if (!features.length && !activeModal) return;
  if (!features.length && activeModal) {
    window.activeModal.remove()
    return
  }

  showWreckMarkerModal(features[0].properties, activeModal, point)
}

function showWreckMarkerModal(wreck, replacesModal=null, fromPoint=null) {
  if (replacesModal && wreck.id === replacesModal.id) return
  const modal = new WreckModal(wreck);
  if (!!replacesModal) {
    modal.replace(replacesModal.element)
  } else {
    modal.reveal(fromPoint)
  }

  window.activeModal = modal;
}

function getWreckAtCenter(map, id) {
  const filter = ["==", "id", id];
  const point = { x: window.width/2, y: window.height/2 }
  const width = 10;
  const height = 10;
  const bounds = [
    [point.x - width / 2, point.y - height / 2],
    [point.x + width / 2, point.y + height / 2]
  ]
  const features = map.queryRenderedFeatures({ filter, layers: wreckLabels });
  return features[0].properties;
}
