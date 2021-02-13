import { WreckModal } from '../modals';

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
  const modal = WreckModal(wreck);
  if (!!replacesModal) {
    modal.replace(replacesModal.element)
  } else {
    modal.reveal(fromPoint)
  }

  window.activeModal = modal;
}
