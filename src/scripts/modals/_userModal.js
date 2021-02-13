import ModalBase from './_modalBase';

export default function UserModal() {
  const { userData } = window;
  const id = !!userData ? `${userData.uid}_profile_modal` : 'login_modal';
  const modalConf = { id, tertiaryAuthUI: false };
  const { modal, authUI, reveal, remove, replace } = ModalBase(modalConf);

  let revealLoginModal

  if (id === 'login_modal') {
    modal.appendChild(authUI.element)
    revealLoginModal = (fromPoint) => {
      reveal(fromPoint)
      authUI.launch()
      window.hideAuthUI = hideLogin
    }
  }

  return {
    id,
    remove,
    replace,
    reveal: revealLoginModal ? revealLoginModal : reveal,
  }

  function hideLogin() {
    modal.style.display = 'none';
    window.activeModal = null;
    authUI.hide()
  }
}
