import FirebaseClient from './firebase';
import Map from './mapbox';

export default function main() {
  window.firebaseClient = new FirebaseClient()
  Map()
}
