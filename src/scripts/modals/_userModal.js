import ModalBase from './_modalBase';
import UserProfileView from './_userProfileView';

export default function UserModal() {
  const { userData } = window;
  const id = !!userData ? `${userData.uid}_profile_modal` : 'login_modal';
  const modalConf = { id, tertiaryAuthUI: false };
  const { modal, authUI, reveal, remove, replace } = ModalBase(modalConf);

  let revealUserModal, replaceWithUserModal
  //let replaceWithUserModal

  if (id === 'login_modal') {
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
    replaceWithUserModal = () => replace()
  }


  return {
    id,
    remove,
    replace: replaceWithUserModal,
    reveal: revealUserModal,
    element: modal,
  }

  function hideLogin() {
    modal.style.display = 'none';
    window.activeModal = null;
    authUI.hide()
  }
}
