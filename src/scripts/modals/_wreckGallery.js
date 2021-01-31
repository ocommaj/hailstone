import { modalAnimations } from '../animations';
import HeadlineElements from './_modalHeadline';

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

  loadGalleryFiles(id, (url) => createImageElement(url))

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

  function createImageElement(url) {
    const img = document.createElement('img');
    img.classList.add('modalGalleryImg');
    img.src = url;
    gallery.appendChild(img);
  }
}

function loadGalleryFiles(id, domCallback) {
  const directoryName = `wrecks/${id}`;
  if (id === 'yamagiriMaru') {
    window.firebaseClient.queryGalleryDB({ domCallback, gallery: id })
    return
  }
  window.firebaseClient.loadGallery({ directoryName, domCallback })
}
