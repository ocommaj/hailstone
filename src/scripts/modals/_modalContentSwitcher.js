import svgIcon from '../../assets/icons/camera-add.svg';
import flipIcon from '../../assets/icons/renew.svg';

const TOGGLER_CLASS = "backfaceShows";

export default function ModalContentSwitcher() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");
  const backfaceIcon = document.createElement("object");

  button.classList.add("switchModalContentButton");

  buttonIcon.classList.add("frontButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  backfaceIcon.classList.add("backfaceButtonIcon");
  backfaceIcon.type = "image/svg+xml";
  backfaceIcon.data = flipIcon;

  button.appendChild(buttonIcon);
  button.appendChild(backfaceIcon);
  button.addEventListener('click', clickHandler)

  this.button = button;
  this.flipModalContent = flipModalContent;

  function clickHandler() {
    flipModalContent()
  }
  
}

function flipModalContent() {
  const activeModal = window.activeModal.element;
  const button = activeModal.querySelector('.switchModalContentButton')
  const contentWrapper = activeModal.querySelector('.contentWrapper')

  contentWrapper.classList.toggle(TOGGLER_CLASS);
  button.classList.toggle(TOGGLER_CLASS);
}
