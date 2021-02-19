import { SiteInfoModal } from '../modals';

export default function urlQueryListener() {
  console.log(`location: ${window.location}`)
  const queryParams  = new URLSearchParams(window.location.search)

  if (queryParams.has('lookup')) {
    const queriedValue = queryParams.get('lookup');
    console.log(`queriedValue: ${queriedValue}`);
    if (queriedValue === 'tos') launchSiteInfoModal();
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
