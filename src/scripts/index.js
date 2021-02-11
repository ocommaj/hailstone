import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper, SearchBar, UserStatusBar } from './components';

export default function main() {
  const userStatusBar = new UserStatusBar();
  window.updateUserStatusBar = userStatusBar.update;

  window.firebaseClient = new FirebaseClient();
  window.mapCanvas = new Map();

  const controlWrapper = ControlWrapper()
  //controlWrapper.appendChild( userStatusBar.element )
  controlWrapper.appendChild( SearchBar() )
  document.body.appendChild(controlWrapper)
}
