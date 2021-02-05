import { modalAnimations } from '../animations';
import HeadlineElements from './_modalHeadline';
import GalleryImage from './_galleryImage';
import AddImageButton from './_addImageButton';
import UploadForm from './_uploadForm';


export default function WreckGalleryModal(vessel) {
  const { id } = vessel;
  const modalWrapper = document.getElementById("modalWrapper");
  const modalId = `${id}_modal`;
  const modal = document.createElement("div");
  const contentWrapper = document.createElement("div");
  const galleryWrapper = document.createElement("div");
  const gallery = document.createElement("div");
  const switchModalContentButton = new AddImageButton()

  modal.id = modalId;
  modal.classList.add('modal');
  contentWrapper.classList.add('contentWrapper');
  galleryWrapper.classList.add('galleryWrapper');
  gallery.classList.add('gallery');

  contentWrapper.appendChild(galleryWrapper);
  galleryWrapper.appendChild(gallery);
  contentWrapper.appendChild( UploadForm() );

  modal.appendChild( HeadlineElements(vessel) );
  modal.appendChild(contentWrapper);

  loadGalleryFiles(id, (config) => gallery.append(GalleryImage(config)));

  modal.appendChild( switchModalContentButton.button )

  this.id = id;
  this.element = modal;
  this.reveal = revealModal;
  this.remove = removeModal;
  this.replace = replaceModal;
  this.refreshModal = refreshModal;

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

  function refreshModal(docToAdd, resolve) {
    return new Promise(resolve => {
      //gallery.insertBefore(GalleryImage(docToAdd), gallery.firstChild)
      gallery.append(GalleryImage(docToAdd))
      switchModalContentButton.flipModalContent()
      resolve()
    })
  }
}

function loadGalleryFiles(gallery, domCallback) {
  window.firebaseClient.loadImagesFromDB({ domCallback, gallery })
}
