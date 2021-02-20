import svgIcon from '../../assets/icons/diveMask.svg';
import { UserModal } from '../modals';

export default function UserStatusBar() {
  const wrapperElement = document.createElement('div');
  const userIconButton = document.createElement('button');
  const userIcon = document.createElement('object');
  const buttonLabel = document.createElement('span')
  wrapperElement.classList.add('userStatusBar');
  wrapperElement.classList.add('topControlElement');
  wrapperElement.tabIndex = -1;
  userIconButton.id = 'userStatusBarButton';
  userIconButton.classList.add('userIconButton');
  userIconButton.tabIndex = 0;
  userIcon.classList.add('userIcon');
  buttonLabel.classList.add('buttonLabel');
  buttonLabel.tabIndex = -1;
  buttonLabel.id = 'userStatusBarLabel';

  userIcon.alt = 'User icon';
  userIcon.tabIndex = -1;
  userIcon.type = "image/svg+xml";
  userIcon.data = svgIcon;


  userIconButton.appendChild(userIcon);
  userIconButton.appendChild(buttonLabel);
  wrapperElement.appendChild(userIconButton);

  userIconButton.addEventListener('mouseover', () => {
    const svgDoc = userIcon.contentDocument;
    const path = svgDoc.querySelector('path');
    path.style.transition = 'fill 0.7s ease'
    path.style.fill = '#262626';
  })

  userIconButton.addEventListener('mouseleave', () => {
    const svgDoc = userIcon.contentDocument;
    const path = svgDoc.querySelector('path');
    path.style.fill = '#f4f4f4';
  })

  userIconButton.addEventListener('click', clickHandler);

  function clickHandler(e) {
    launchUserModal(e)
  }

  return {
    updateUserStatusBar,
    userStatusBar: wrapperElement,
  }
}

function updateUserStatusBar() {
  const { userData } = window;
  const label = document.getElementById('userStatusBarLabel');

  if (!userData) {
    label.innerHTML = 'Login | Signup';
  } else {
    label.innerHTML = `${userData.displayName}`
  }
}

function launchUserModal(e) {
  if (window.activeModal && !!window.activeModal.isUserModal) return;
  const fromPoint = { x: e.offsetX, y: e.offsetY };
  const activeModal = window.activeModal;
  const modal = UserModal();

  if (!activeModal) {
    modal.reveal(fromPoint)
  } else {
    modal.replace(activeModal.element)
  }

  window.activeModal = modal;
  window.activeModal.isUserModal = true;
}
