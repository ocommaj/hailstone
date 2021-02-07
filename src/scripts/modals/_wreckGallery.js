import { modalAnimations } from '../animations';
import FirebaseAuthUIContainer from './_firebaseAuthUIContainer';
import GalleryImage from './_galleryImage';
import HeadlineElements from './_modalHeadline';
import ModalContentSwitcher from './_modalContentSwitcher';
import UploadForm from './_uploadForm';


export default function WreckGalleryModal(vessel) {
  const { id } = vessel;
  const modalWrapper = document.getElementById("modalWrapper");
  const modalId = `${id}_modal`;
  const modal = document.createElement("div");
  const contentWrapper = document.createElement("div");
  const galleryWrapper = document.createElement("div");
  const gallery = document.createElement("div");
  const switchModalContent = new ModalContentSwitcher();
  const firebaseAuthUI = new FirebaseAuthUIContainer();

  modal.id = modalId;
  modal.classList.add('modal');
  contentWrapper.classList.add('contentWrapper');
  galleryWrapper.classList.add('wrappedModalContent');
  galleryWrapper.classList.add('galleryWrapper');
  gallery.classList.add('gallery');
  firebaseAuthUI.element.classList.add('tertiaryContent')

  contentWrapper.appendChild(galleryWrapper);
  galleryWrapper.appendChild(gallery);
  contentWrapper.appendChild( UploadForm() );
  contentWrapper.appendChild( firebaseAuthUI.element );

  modal.appendChild( HeadlineElements(vessel) );
  modal.appendChild(contentWrapper);

  loadGalleryFiles(id, (config) => gallery.append(GalleryImage(config)));

  modal.appendChild( switchModalContent.button )

  this.id = id;
  this.element = modal;
  this.reveal = revealModal;
  this.remove = removeModal;
  this.replace = replaceModal;
  this.refreshModal = refreshModal;
  window.launchAuthUI = launchAuthUI;
  window.hideAuthUI = hideAuthUI;

  function revealModal(fromPoint) {
    document.body.insertBefore(modal, document.body.firstChild)
    modalAnimations.reveal(modal, fromPoint);
  }

  function removeModal() {
    modalAnimations.collapse(modal, () => {
      document.body.removeChild(modal);
      window.activeModal = null;
    })
  }

  function replaceModal(outgoing) {
    document.body.insertBefore(modal, document.body.firstChild)
    modalAnimations.replace(modal, outgoing)
  }

  function refreshModal(docToAdd, resolve) {
    return new Promise(resolve => {
      gallery.append(GalleryImage(docToAdd))
      switchModalContent.flipModalContent()
      resolve()
    })
  }

  function launchAuthUI() {
    switchModalContent.toggleTertiaryContent()
    firebaseAuthUI.start()
  }

  function hideAuthUI() {
    switchModalContent.toggleTertiaryContent()
    firebaseAuthUI.element.style.display = 'none';
  }
}

function loadGalleryFiles(gallery, domCallback) {
  window.firebaseClient.loadImagesFromDB({ domCallback, gallery })
}
