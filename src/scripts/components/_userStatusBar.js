import svgIcon from '../../assets/icons/diveMask.svg'

export default function UserStatusBar() {
  const wrapperElement = document.createElement('div');
  const userIconButton = document.createElement('button');
  const userIcon = document.createElement('object');
  const buttonLabel = document.createElement('span')
  wrapperElement.classList.add('userStatusBar');
  wrapperElement.tabIndex = -1;
  userIconButton.classList.add('userIconButton');
  userIcon.classList.add('userIcon');
  buttonLabel.classList.add('buttonLabel');

  userIcon.tabIndex = -1;
  userIcon.type = "image/svg+xml";
  userIcon.data = svgIcon;

  buttonLabel.innerHTML='Login | Signup'

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

  return wrapperElement;
}
