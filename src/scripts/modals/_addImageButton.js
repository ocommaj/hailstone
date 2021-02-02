import svgIcon from '../../assets/icons/camera-add.svg';

export default function AddImageButton() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");

  button.classList.add("addImageButton");
  buttonIcon.classList.add("addImageButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  button.appendChild(buttonIcon);
  button.addEventListener('click', addImage)

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