import svgIcon from '../../assets/icons/camera-add.svg';
import flipIcon from '../../assets/icons/renew.svg';

export default function AddImageButton() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");
  const backfaceIcon = document.createElement("object");

  button.classList.add("addImageButton");

  buttonIcon.classList.add("addImageButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  backfaceIcon.classList.add("backfaceButtonIcon");
  backfaceIcon.type = "image/svg+xml";
  backfaceIcon.data = flipIcon;

  button.appendChild(buttonIcon);
  button.appendChild(backfaceIcon);
  button.addEventListener('click', clickHandler)

  function clickHandler() {
    flipModalContent(button)
  }

  this.button = button;
  this.flipModalContent = () => flipModalContent(button);
}

function flipModalContent(button) {
  const activeModal = window.activeModal.element;
  const contentWrapper = activeModal.querySelector('.contentWrapper')
  const frontContent = contentWrapper.childNodes[0];
  const backContent = contentWrapper.childNodes[1];
  const showsBack = [...contentWrapper.classList].includes('backfaceShows');

  if (showsBack) {
    frontContent.style.transform = 'rotateY(0deg)';
    backContent.style.transform = 'rotateY(180deg)';
    backContent.style.opacity = 0;
  } else {
    frontContent.style.transform = 'rotateY(180deg)';
    backContent.style.transform = 'rotateY(0deg)';
    backContent.style.opacity = 1;
  }

  contentWrapper.classList.toggle('backfaceShows');
  flipButton(button, showsBack);
  return
}

function flipButton(button, backfaceShows=true) {
  const frontIcon = button.childNodes[0];
  const backIcon = button.childNodes[1];

  const backIconSVG = backIcon.contentDocument;
  const backSvgPaths = backIcon.contentDocument.querySelectorAll('path')
  for (let i=0; i<backSvgPaths.length; i++) {
    backSvgPaths[i].style.fill = "#e0e0e0"
  }

  if (backfaceShows) {
    frontIcon.style.opacity = 1;
    backIcon.style.opacity = 0;
    button.style.boxShadow = ".25rem .25rem .5rem rgba(218,30,40,.3)"
  } else {
    frontIcon.style.opacity = 0;
    backIcon.style.opacity = 1;
    button.style.boxShadow = ".25rem .25rem .5rem rgba(38,38,38,.3)"
  }
}
