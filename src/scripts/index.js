import FirebaseClient from './firebase';
import Map from './mapbox';

export default function main() {
  window.firebaseClient = new FirebaseClient()
  restyleWindowHeight()
  Map()
}

function restyleWindowHeight() {
  const rootElement = document.querySelector("body")
  const viewPortH = rootElement.getBoundingClientRect().height;
  const windowH = window.innerHeight;
  const browserUiBarsH = viewPortH - windowH;
  rootElement.style.height = `calc(100vh - ${browserUiBarsH}px)`;
}
