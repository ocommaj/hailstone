import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper } from './components';

export default function main() {
  //window.addEventListener("resize", onResize)
  //onResize()

  const { controlWrapper, updateUserStatusBar } = new ControlWrapper()

  window.updateUserStatusBar = updateUserStatusBar;
  window.firebaseClient = new FirebaseClient();
  window.mapCanvas = new Map();


  document.body.appendChild(controlWrapper)

}

function onResize() {
  document.body.height = `${window.innerHeight}px`;
}
