import ApplauseButton from './_applauseButton';

export default function GalleryImage({ url, imgId=null, upvotes=null }) {
  const galleryImg = document.createElement('div');
  const img = document.createElement('img');
  galleryImg.classList.add('modalGalleryImgWrapper');
  img.classList.add('modalGalleryImg');
  img.src = url;
  if (imgId !== null) galleryImg.dataset.imgId = imgId;
  if (upvotes !== null) galleryImg.dataset.upvotes = upvotes;
  galleryImg.appendChild(img);
  galleryImg.appendChild( ApplauseButton() )
  return galleryImg;
}
