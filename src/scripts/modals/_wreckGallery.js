import { modalAnimations } from '../animations'

export default function wreckGallery(vessel, fromPoint) {
  const { id } = vessel;
  const modalWrapper = document.getElementById("modalWrapper");
  const modalId = `${id}_modal`;
  const modal = document.createElement("div");
  modal.classList.add('modal');
  modal.id = modalId;
  modal.appendChild( ModalHeader(vessel) );

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
    modal.appendChild(img);
  }
}

function ModalHeader(vessel) {
  const { title, maxDepth, length=null, wingspan=null } = vessel;
  const header = document.createElement("div");
  const subheadWrapper = document.createElement("div");
  const headline = document.createElement("h1");
  const depthSubhead = document.createElement("h2");
  const lengthSubhead = document.createElement("h2");
  const titleText = document.createTextNode(title);
  const depthSubtext = document.createTextNode(`Depth: 10-${maxDepth}`);
  const lengthSubtext = document
    .createTextNode(`Length: ${length || wingspan}m`)

  header.classList.add('modalHeader');
  subheadWrapper.classList.add('subheadWrapper');
  headline.appendChild(titleText);
  depthSubhead.appendChild(depthSubtext);
  lengthSubhead.appendChild(lengthSubtext);
  subheadWrapper.appendChild(depthSubhead);
  subheadWrapper.appendChild(lengthSubhead);
  header.appendChild(headline);
  header.appendChild(subheadWrapper);
  return header;
}

function loadGalleryFiles(id, domCallback) {
  const directoryName = `wrecks/${id}`;
  window.firebaseClient.loadGallery({ directoryName, domCallback })
}
