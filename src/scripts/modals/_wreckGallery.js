import ModalBase from './_modalBase';
import ContentSwitcher from './_modalContentSwitcher';
import GalleryContent from './_modalGallery';
import HeadlineElements from './_modalHeadline';
import UploadForm from './_uploadForm';

export default function WreckGalleryModal(vessel) {
  const { id } = vessel;
  const { modal, authUI, reveal, remove, replace } = ModalBase({ id });
  const { contentSwitcher, flipContent, toggleTertiary } = ContentSwitcher();
  const { gallery, updateGallery } = GalleryContent(id);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add('contentWrapper');
  contentWrapper.appendChild(gallery);
  contentWrapper.appendChild( UploadForm() );
  contentWrapper.appendChild( authUI.element );

  modal.appendChild( HeadlineElements(vessel) );
  modal.appendChild(contentWrapper);
  modal.appendChild(contentSwitcher);

  window.launchAuthUI = launchAuthUI;
  window.hideAuthUI = hideAuthUI;

  return {
    id,
    launchAuthUI,
    refreshModal,
    reveal,
    remove,
    replace,
    element: modal
  }

  function refreshModal(docToAdd, resolve) {
    return new Promise(resolve => {
      updateGallery(docToAdd)
        .then(() => {
          flipContent()
          resolve()
        })
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
