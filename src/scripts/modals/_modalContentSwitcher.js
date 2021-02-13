import frontIcon from '../../assets/icons/camera-add.svg';
import flipIcon from '../../assets/icons/renew.svg';
import resetIcon from '../../assets/icons/reset.svg';

const TOGGLER_CLASS = "backfaceShows";
const TERTIARY_CLASS = "tertiaryContent";
const TERTIARY_TOGGLER = "tertiaryContentShows";

export default function ModalContentSwitcher() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");
  const backfaceIcon = document.createElement("object");
  const tertiaryIcon = document.createElement("object");

  button.classList.add("switchModalContentButton");

  buttonIcon.classList.add("buttonIcon", "frontButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = frontIcon;

  backfaceIcon.classList.add("buttonIcon", "backfaceButtonIcon");
  backfaceIcon.type = "image/svg+xml";
  backfaceIcon.data = flipIcon;

  tertiaryIcon.classList.add("buttonIcon", "tertiaryButtonIcon");
  tertiaryIcon.type = "image/svg+xml";
  tertiaryIcon.data = resetIcon;

  button.appendChild(buttonIcon);
  button.appendChild(backfaceIcon);
  button.appendChild(tertiaryIcon);
  button.addEventListener('click', flipModalContent)

  return {  
    contentSwitcher: button,
    flipContent: flipModalContent,
    toggleTertiary: toggleTertiaryContent
  }

  function flipModalContent() {
    const activeModal = window.activeModal.element;
    const contentWrapper = activeModal.querySelector('.contentWrapper');

    contentWrapper.classList.toggle(TOGGLER_CLASS);
    button.classList.toggle(TOGGLER_CLASS);
  }

  function toggleTertiaryContent() {
    const activeModal = window.activeModal.element;
    const tertiaryContent = activeModal.querySelector(`.${TERTIARY_CLASS}`);

    if (button.classList.contains(TERTIARY_TOGGLER)) {
      tertiaryContent.style.display = 'none';
      button.removeEventListener('click', toggleTertiaryContent);
      button.addEventListener('click', flipModalContent);
    } else {
      tertiaryContent.style.display = 'flex';
      button.removeEventListener('click', flipModalContent);
      button.addEventListener('click', toggleTertiaryContent);
    }

    button.classList.toggle(TERTIARY_TOGGLER)
  }
}
