import { modalAnimations } from '../animations';
import FirebaseAuthUIContainer from './_firebaseAuthUIContainer';

export default function ModalBase({ id, tertiaryAuthUI=true }) {
  const modal = document.createElement("div");
  modal.id = `${id}_modal`;
  modal.classList.add('modal');

  const firebaseAuthUI = new FirebaseAuthUIContainer();
  if (!!tertiaryAuthUI) {
    firebaseAuthUI.element.classList.add('tertiaryContent')
  }

  return {
    modal,
    reveal: (fromPoint) => _revealModal(modal, fromPoint),
    remove: () => _removeModal(modal),
    replace: (outgoing) => _replaceModal(modal, outgoing),
    authUI: {
      element: firebaseAuthUI.element,
      launch: () => _launchAuthUI({ authUI: firebaseAuthUI }),
      hide: () => _hideAuthUI({ authUI: firebaseAuthUI })
    }
  }
}

function _revealModal(modal, fromPoint) {
  document.body.insertBefore(modal, document.body.firstChild)
  modalAnimations.reveal(modal, fromPoint);
}

function _removeModal(modal) {
  modalAnimations.collapse(modal, () => {
    document.body.removeChild(modal);
    window.activeModal = null;
  })
}

function _replaceModal(modal, outgoing) {
  document.body.insertBefore(modal, document.body.firstChild)
  modalAnimations.replace(modal, outgoing)
}

function _launchAuthUI({ authUI }) {
  authUI.start()
}

function _hideAuthUI({ authUI }) {
  authUI.element.style.display = 'none';
}
