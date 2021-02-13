import ModalBase from './_modalBase';
import GalleryImage from './_galleryImage';
import HeadlineElements from './_modalHeadline';
import ContentSwitcher from './_modalContentSwitcher';
import UploadForm from './_uploadForm';

export default function WreckGalleryModal(vessel) {
  const { id } = vessel;
  const { modal, authUI, reveal, remove, replace } = ModalBase({ id });
  const { contentSwitcher, flipContent, toggleTertiary } = ContentSwitcher();

  const contentWrapper = document.createElement("div");
  const galleryWrapper = document.createElement("div");
  const gallery = document.createElement("div");

  contentWrapper.classList.add('contentWrapper');
  galleryWrapper.classList.add('wrappedModalContent');
  galleryWrapper.classList.add('galleryWrapper');
  gallery.classList.add('gallery');

  contentWrapper.appendChild(galleryWrapper);
  galleryWrapper.appendChild(gallery);
  contentWrapper.appendChild( UploadForm() );
  contentWrapper.appendChild( authUI.element );

  modal.appendChild( HeadlineElements(vessel) );
  modal.appendChild(contentWrapper);
  modal.appendChild( contentSwitcher );

  loadGalleryFiles(id, (config) => gallery.append(GalleryImage(config)));

  window.launchAuthUI = launchAuthUI;
  window.hideAuthUI = hideAuthUI;

  return {
    id,
    refreshModal,
    reveal,
    remove,
    replace,
    element: modal
  }

  function refreshModal(docToAdd, resolve) {
    return new Promise(resolve => {
      gallery.append(GalleryImage(docToAdd))
      flipContent()
      resolve()
    })
  }

  function launchAuthUI() {
    toggleTertiary()
    authUI.launch()
  }

  function hideAuthUI() {
    toggleTertiary()
    authUI.hide()
  }
}

function loadGalleryFiles(gallery, domCallback) {
  window.firebaseClient.loadImagesFromDB({ domCallback, gallery })
}
