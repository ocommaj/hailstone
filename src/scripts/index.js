import wreckData from '../assets/wreckLocations.json';
import FirebaseClient from './firebase';
import Map from './mapbox';
import { ControlWrapper } from './components';
import urlQueryListener from './controllers';

window.wreckFeatures = wreckData.features;

export default function main() {
  const { controlWrapper, updateUserStatusBar } = ControlWrapper()

  document.body.appendChild(controlWrapper);

  window.updateUserStatusBar = updateUserStatusBar;
  window.firebaseClient = FirebaseClient();

  Map();
  urlQueryListener();
}
