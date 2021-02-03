import svgIcon from '../../assets/icons/camera-add.svg';

export default function AddImageButton() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");
  const backfaceIcon = document.createElement("object");

  button.classList.add("addImageButton");
  buttonIcon.classList.add("addImageButtonIcon");
  backfaceIcon.classList.add("backfaceButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  button.appendChild(buttonIcon);
  button.appendChild(backfaceIcon);
  button.addEventListener('click', () => {
    addImage()
    flipButton(button)
  })

  return button
}

function addImage() {
  const activeModal = window.activeModal.element;
  const contentWrapper = activeModal.querySelector('.contentWrapper')
  const galleryWrapper = contentWrapper.childNodes[0]
  const uploadForm = contentWrapper.childNodes[1]
  contentWrapper.scrollTop = 0;
  contentWrapper.style.overflowY = 'hidden';
  galleryWrapper.style.transform = 'rotateY(180deg)';
  uploadForm.style.transform = 'rotateY(0deg)';
  uploadForm.style.opacity = 1;
}

function flipButton(button) {
  const frontIcon = button.childNodes[0];
  const backIcon = button.childNodes[1];
  frontIcon.style.opacity = 0;
  backIcon.style.opacity = 1;
  button.style.boxShadow = ".25rem .25rem .5rem rgba(38,38,38,.3)"
}
