import { SiteInfoModal, WreckModal } from '../modals';

export default function urlQueryListener() {
  const queryParams  = new URLSearchParams(window.location.search)

  if (queryParams.has('lookup')) {
    const queriedValue = queryParams.get('lookup');
    if (queriedValue === 'tos' || queriedValue === 'privacy') {
      setTimeout(launchSiteInfoModal, 2000)
    }
  }

  /*if (queryParams.has('vesselId')) {
    const wreckId = queryParams.get('vesselId');
    setTimeout(() => launchWreckGalleryModal(wreckId), 3000)
  }*/
}

function launchSiteInfoModal() {
  const modal = SiteInfoModal()
  const { activeModal } = window;

  if (!activeModal) {
    modal.reveal()
  } else {
    modal.replace(activeModal.element)
  }

  window.activeModal = modal;
}

function launchWreckGalleryModal(wreckId) {
  const modal = WreckModal(wreckId);
  const { activeModal } = window;

  if (!activeModal) {
    modal.reveal()
  } else {
    modal.replace(activeModal.element)
  }

  window.activeModal = modal;
}
