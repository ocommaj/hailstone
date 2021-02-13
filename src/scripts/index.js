import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper } from './components';

export default function main() {
  const { controlWrapper, updateUserStatusBar } = new ControlWrapper()

  window.updateUserStatusBar = updateUserStatusBar;
  window.firebaseClient = new FirebaseClient();
  window.mapCanvas = new Map();

  document.body.appendChild(controlWrapper)
}
