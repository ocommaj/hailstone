import GalleryImage from '../components/_galleryImage';

export default function GalleryContent(id) {
  const { user: { isAnonymous } } = window;

  const contentWrapper = document.createElement("div");
  const galleryContent = document.createElement("div");
  contentWrapper.classList.add('wrappedModalContent');
  contentWrapper.classList.add('galleryWrapper');
  galleryContent.classList.add('gallery');
  contentWrapper.appendChild(galleryContent);

  loadGalleryFiles(id, (file) => {
    const applauseButton = includeApplauseButton(file);
    galleryContent.append( GalleryImage({ applauseButton, file }) )
  });

  return {
    gallery: contentWrapper,
    updateGallery: (fileToAdd) => updateGallery(galleryContent, fileToAdd),
  }
}

function includeApplauseButton(file) {
  const { userData } = window;
  const { imgId } = file;
  if (!userData) return true;
  const upvotedImages = userData.upvotedImages;

  if (!upvotedImages) return true;
  if (upvotedImages.includes(imgId)) {
    return false;
  } else {
    return true
  }
}

function updateGallery(gallery, fileToAdd) {
  return new Promise((resolve) => {
    gallery.append(GalleryImage(fileToAdd))
    resolve()
  })
}

function loadGalleryFiles(galleryId, domCallback) {
  const { firebaseClient: { loadImagesFromDB} } = window;
  loadImagesFromDB({ domCallback, gallery: galleryId });
}
