import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper, SearchBar, UserStatusBar } from './components';

export default function main() {
  window.firebaseClient = new FirebaseClient()
  window.mapCanvas = new Map()

  const controlWrapper = ControlWrapper()
  //controlWrapper.appendChild( UserStatusBar() )
  controlWrapper.appendChild( SearchBar() )
  document.body.appendChild(controlWrapper)
}
