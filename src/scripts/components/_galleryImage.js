import ApplauseButton from './_applauseButton';

export default function GalleryImage({ file, applauseButton=true }) {
  const { url, imgId=null, upvotes=null } = file;
  const galleryImg = document.createElement('div');
  const img = document.createElement('img');
  galleryImg.classList.add('modalGalleryImgWrapper');
  img.classList.add('modalGalleryImg');
  img.src = url;
  img.style.opacity = 0;
  if (imgId !== null) galleryImg.dataset.imgId = imgId;
  if (upvotes !== null) galleryImg.dataset.upvotes = upvotes;
  galleryImg.appendChild(img);
  if (!!applauseButton) {
    const { applauseButton, upvoteGraphic } = ApplauseButton()
    galleryImg.appendChild(applauseButton)
    galleryImg.appendChild(upvoteGraphic)
  }

  img.addEventListener('load', () => {
    img.style.visibility = 'visible';
    img.style.opacity = 1;
  })

  return galleryImg;
}
