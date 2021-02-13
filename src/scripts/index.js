import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper } from './components';

export default function main() {
  const { controlWrapper, updateUserStatusBar } = new ControlWrapper()

  window.updateUserStatusBar = updateUserStatusBar;
  window.firebaseClient = new FirebaseClient();
  window.mapCanvas = new Map();

  onResize()
  document.body.appendChild(controlWrapper)
  window.addEventListener("resize", onResize)
}

function onResize() {
  document.body.height = window.innerHeight;
}
