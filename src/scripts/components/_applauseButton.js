import svgIcon from '../../assets/icons/shaka.svg';
import { upvoteAnimation } from '../animations';

export default function ApplauseButton() {
  const applauseButton = document.createElement("button");
  const buttonIcon = document.createElement("object");
  const { runUpvoteAnimation, graphic: upvoteGraphic } = UpvoteGraphic();

  applauseButton.classList.add("postApplauseButton");
  buttonIcon.classList.add("postApplauseButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  applauseButton.appendChild(buttonIcon);
  applauseButton.addEventListener('click', (e) => clickHandler(e, runUpvoteAnimation))

  return { applauseButton, upvoteGraphic };
}

function UpvoteGraphic() {
  const graphic = document.createElement('span');
  graphic.classList.add('upvoteGraphic');
  graphic.innerHTML = '+1';

  const runUpvoteAnimation = () => upvoteAnimation.run({ graphic }).play()

  return { graphic, runUpvoteAnimation }
}

function clickHandler(e, upvoteAnimation) {
  const onButton = e.target;

  upvote()
  clickStyler()
  upvoteAnimation()

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
