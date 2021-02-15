import ApplauseButton from './_applauseButton';

export default function GalleryImage({
  url,
  imgId=null,
  upvotes=null,
  applauseButton=true,
}) {
  const galleryImg = document.createElement('div');
  const img = document.createElement('img');
  galleryImg.classList.add('modalGalleryImgWrapper');
  img.classList.add('modalGalleryImg');
  img.src = url;
  img.style.opacity = 0;
  if (imgId !== null) galleryImg.dataset.imgId = imgId;
  if (upvotes !== null) galleryImg.dataset.upvotes = upvotes;
  galleryImg.appendChild(img);
  if (!!applauseButton) galleryImg.appendChild( ApplauseButton() )

  img.addEventListener('load', () => {
    img.style.visibility = 'visible';
    img.style.opacity = 1;
  })

  return galleryImg;
}
