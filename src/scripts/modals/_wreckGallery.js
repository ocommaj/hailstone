import { modalAnimations } from '../animations'

export default function wreckGallery(vessel, fromPoint) {
  const { id, title } = vessel;
  const modalId = `${id}_modal`;
  const modalWrapper = document.getElementById("modalWrapper");
  const modal = document.createElement("div");
  const titleLine = document.createElement("h1");
  const titleText = document.createTextNode(title);
  const testContent = document.createElement("p");
  const contentText = document.createTextNode('This is some text')
  titleLine.appendChild(titleText);
  testContent.appendChild(contentText);
  modal.appendChild(titleLine);
  modal.appendChild(testContent);
  modal.classList.add('modal');
  modal.id = modalId;

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
}
