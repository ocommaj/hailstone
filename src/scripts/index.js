import FirebaseClient from './firebase';
import Map from './mapbox';

export default function main() {
  window.isMobileUser = mobileDetect()
  window.firebaseClient = new FirebaseClient()
  Map()

}

function mobileDetect() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const testEx = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
  if (!testEx.test(userAgent)) return false;
}
