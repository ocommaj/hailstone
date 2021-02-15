import svgIcon from '../../assets/icons/shaka.svg';

export default function ApplauseButton() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");

  button.classList.add("postApplauseButton");
  buttonIcon.classList.add("postApplauseButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  button.appendChild(buttonIcon);
  button.addEventListener('click', () => clickHandler(button))

  return button;
}

function clickHandler(onButton) {
  upvote()
  clickStyler()

  function upvote() {
    const { id: galleryId } = window.activeModal;
    const { imgId } = onButton.parentElement.dataset;
    window.firebaseClient.upvoteImage({ gallery: galleryId, id: imgId })
  }

  function clickStyler() {
    onButton.style.backgroundColor = '#0f62fe';
    onButton.style.transform = 'scale(.85)';
    setTimeout(() => {
      onButton.style.backgroundColor = 'rgba(57,57,57,.5)';
      onButton.style.transform = 'scale(1) rotateZ(-15deg)';
    }, 400)
  }
}
