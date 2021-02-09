import FirebaseClient from './firebase';
import Map from './mapbox';
import { SearchBar } from './components';

export default function main() {
  window.firebaseClient = new FirebaseClient()
  Map()
  SearchBar()
}
