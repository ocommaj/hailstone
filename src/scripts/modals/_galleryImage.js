import svgIcon from '../../assets/icons/shaka.svg';

export default function GalleryImage({ url, imgId=null, upvotes=null }) {
  const galleryImg = document.createElement('div');
  const img = document.createElement('img');
  galleryImg.classList.add('modalGalleryImgWrapper');
  img.classList.add('modalGalleryImg');
  img.src = url;
  if (imgId !== null) img.dataset.imgId = imgId;
  if (upvotes !== null) img.dataset.upvotes = upvotes;
  galleryImg.appendChild(img);
  galleryImg.appendChild( applauseButton() )
  return galleryImg;
}

function applauseButton() {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("object");

  button.classList.add("postApplauseButton");
  buttonIcon.classList.add("postApplauseButtonIcon");
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = svgIcon;

  button.appendChild(buttonIcon);
  button.addEventListener('click', () => {
    button.style.backgroundColor = '#0f62fe';
    button.style.transform = 'scale(.85) ';
    setTimeout(() => {
      button.style.backgroundColor = 'rgba(57,57,57,.5)';
      button.style.transform = 'scale(1) rotateZ(-15deg)';
    }, 400)
  })
  return button;
}
