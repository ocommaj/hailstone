import svgIcon from '../../assets/icons/diveMask.svg'

export default function UserStatusBar() {
  const wrapperElement = document.createElement('div');
  const userIconButton = document.createElement('button');
  const userIcon = document.createElement('object');
  const buttonLabel = document.createElement('span')
  wrapperElement.classList.add('userStatusBar');
  wrapperElement.classList.add('topControlElement');
  wrapperElement.tabIndex = -1;
  userIconButton.classList.add('userIconButton');
  userIconButton.tabIndex = 1;
  userIcon.classList.add('userIcon');
  buttonLabel.classList.add('buttonLabel');
  buttonLabel.tabIndex = -1;
  buttonLabel.id = 'userStatusBarLabel';

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

  return {
    updateUserStatusBar,
    userStatusBar: wrapperElement,
  }
}

function updateUserStatusBar(userData=null) {
  const label = document.getElementById('userStatusBarLabel');

  if (!userData) {
    label.innerHTML = 'Login | Signup';
  } else {
    label.innerHTML = `${userData.displayName}`
  }
}
