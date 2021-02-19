import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper } from './components';
import urlQueryListener from './controllers';

export default function main() {
  const { controlWrapper, updateUserStatusBar } = ControlWrapper()
  document.body.appendChild(controlWrapper);

  window.updateUserStatusBar = updateUserStatusBar;
  window.firebaseClient = FirebaseClient();
  window.mapCanvas = Map();

  urlQueryListener()
}
