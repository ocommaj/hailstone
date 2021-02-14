import ModalBase from './_modalBase';
import UserProfileView from './_userProfileView';

export default function UserModal() {
  const { userData } = window;
  const id = !!userData ? `${userData.uid}_profile` : 'login';
  const modalConf = { id, tertiaryAuthUI: false };
  const { modal, authUI, reveal, remove, replace } = ModalBase(modalConf);

  let revealUserModal, replaceWithUserModal;

  if (!userData) {
    modal.appendChild(authUI.element)
    revealUserModal = (fromPoint) => {
      reveal(fromPoint);
      authUI.launch();
      window.hideAuthUI = hideLogin;
    }
    replaceWithUserModal = (outgoing) => {
      replace(outgoing);
      authUI.launch();
      window.hideAuthUI = hideLogin;
    }
  } else {
    const { userProfileView } = UserProfileView(userData);
    modal.appendChild(userProfileView);
    revealUserModal = (fromPoint) => reveal(fromPoint);
    replaceWithUserModal = (outgoing) => replace(outgoing)
  }

  return {
    remove,
    id: `${id}_modal`,
    replace: replaceWithUserModal,
    reveal: revealUserModal,
    element: modal,
  }

  function hideLogin() {
    authUI.hide()
    document.body.removeChild(modal);
    window.activeModal = null;
  }
}
