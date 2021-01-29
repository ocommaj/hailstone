import { modalAnimations } from '../animations'

export default function wreckGallery(vessel, fromPoint) {
  const { id, title } = vessel;
  const modalId = `${id}_modal`;
  const modalWrapper = document.getElementById("modalWrapper");
  const modal = document.createElement("div");
  const titleLine = document.createElement("h1");
  const titleText = document.createTextNode(title);

  titleLine.appendChild(titleText);
  modal.appendChild(titleLine);
  modal.classList.add('modal');
  modal.id = modalId;

  //const testContent = document.createElement("p");
  //const contentText = document.createTextNode('This is some text')
  //testContent.appendChild(contentText);
  //modal.appendChild(testContent);

  loadGalleryFiles(id, (url) => createImageElement(url))

  modalWrapper.appendChild(modal);
  modalAnimations.reveal(modal, fromPoint);

  document.addEventListener('click', removeModal, true);

  function removeModal(e) {
    if (!modal.contains(e.target)) {
      modalWrapper.removeChild(modal);
      document.removeEventListener('click', removeModal, true);

      /*modalAnimations.collapse(modal, onComplete)
      function onComplete() {
        modalWrapper.removeChild(modal);
        document.removeEventListener('click', removeModal, true);
      }*/
    }
  }

  function createImageElement(url) {
    const img = document.createElement('img');
    img.classList.add('modalGalleryImg');
    img.src = url;
    img.style.opacity = 1;
    modal.appendChild(img)
  }
}

function loadGalleryFiles(id, domCallback) {
  const directoryName = `wrecks/${id}`;
  window.firebaseClient.loadGallery({ directoryName, domCallback })
}
