import { modalAnimations } from '../animations';
import FirebaseAuthUIContainer from './_firebaseAuthUIContainer';

export default function ModalBase({ id, hasAuthUI=true, tertiaryAuth=true }) {
  const modal = document.createElement("div");
  modal.id = `${id}_modal`;
  modal.classList.add('modal');

  let authUI;

  if (!!hasAuthUI) {
    const firebaseAuthUI = new FirebaseAuthUIContainer();
    if (!!tertiaryAuth) {
      firebaseAuthUI.element.classList.add('tertiaryContent')
    }

    authUI = {
      element: firebaseAuthUI.element,
      launch: () => _launchAuthUI({ authUI: firebaseAuthUI }),
      hide: () => _hideAuthUI({ authUI: firebaseAuthUI })
    }
  }

  return {
    modal,
    authUI,
    remove: () => _removeModal(modal),
    replace: (outgoing) => _replaceModal(modal, outgoing),
    reveal: (fromPoint) => _revealModal(modal, fromPoint),
  }
}

function _revealModal(modal, calledFromPoint=null) {
  const center = { x: window.innerWidth/2, y: window.innerHeight/2 }
  const fromPoint = !!calledFromPoint ? calledFromPoint : center;
  document.body.insertBefore(modal, document.body.firstChild)
  modalAnimations.reveal({ modal, fromPoint });
}

function _removeModal(modal) {
  modalAnimations.collapse({ modal, onComplete: () => {
    document.body.removeChild(modal);
    window.activeModal = null;
    }
  })
}

function _replaceModal(modal, outgoing) {
  document.body.insertBefore(modal, document.body.firstChild)
  modalAnimations.replace({ incoming: modal, outgoing })
}

function _launchAuthUI({ authUI }) {
  authUI.start()
}

function _hideAuthUI({ authUI }) {
  authUI.element.style.display = 'none';
}
