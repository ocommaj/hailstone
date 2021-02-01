import { modalAnimations } from '../animations';
import HeadlineElements from './_modalHeadline';
import GalleryImage from './_galleryImage';


export default function wreckGallery(vessel) {
  const { id } = vessel;
  const modalWrapper = document.getElementById("modalWrapper");
  const modalId = `${id}_modal`;
  const modal = document.createElement("div");
  const galleryWrapper = document.createElement("div");
  const gallery = document.createElement("div");

  gallery.classList.add('gallery');
  galleryWrapper.classList.add('galleryWrapper');
  modal.classList.add('modal');
  modal.id = modalId;
  modal.appendChild( HeadlineElements(vessel) );
  modal.appendChild(galleryWrapper);
  galleryWrapper.appendChild(gallery);

  loadGalleryFiles(id, (config) => { gallery.append(GalleryImage(config)) });

  this.id = id;
  this.element = modal;
  this.reveal = revealModal;
  this.remove = removeModal;
  this.replace = replaceModal;

  function revealModal(fromPoint) {
    modalWrapper.appendChild(modal);
    modalAnimations.reveal(modal, fromPoint);
  }

  function removeModal() {
    modalAnimations.collapse(modal, () => {
      modalWrapper.removeChild(modal);
      window.activeModal = null;
    })
  }

  function replaceModal(outgoing) {
    modalWrapper.appendChild(modal)
    modalAnimations.replace(modal, outgoing)
  }

}

function loadGalleryFiles(gallery, domCallback) {
  if (gallery === 'yamagiriMaru' || gallery === 'nippoMaru') {
    window.firebaseClient.loadImagesFromDB({ domCallback, gallery })
    return
  }
}
