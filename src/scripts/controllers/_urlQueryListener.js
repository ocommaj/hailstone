import { SiteInfoModal } from '../modals';

export default function urlQueryListener() {
  const queryParams  = new URLSearchParams(window.location.search)

  if (queryParams.has('lookup')) {
    const queriedValue = queryParams.get('lookup');
    if (queriedValue === 'tos' || queriedValue === 'privacy') {
      launchSiteInfoModal();
    }
  }
}

function launchSiteInfoModal() {
  const modal = SiteInfoModal()
  const activeModal = window.activeModal;

  if (!activeModal) {
    modal.reveal()
  } else {
    modal.replace(activeModal.element)
  }

  window.activeModal = modal;
}
