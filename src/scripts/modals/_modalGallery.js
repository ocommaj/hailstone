import GalleryImage from '../components/_galleryImage';

export default function GalleryContent(id) {
  const contentWrapper = document.createElement("div");
  const galleryContent = document.createElement("div");
  contentWrapper.classList.add('wrappedModalContent');
  contentWrapper.classList.add('galleryWrapper');
  galleryContent.classList.add('gallery');
  contentWrapper.appendChild(galleryContent);

  loadGalleryFiles(id, (file) => galleryContent.append(GalleryImage(file)) );

  return {
    gallery: contentWrapper,
    updateGallery: (fileToAdd) => updateGallery(galleryContent, fileToAdd),
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
