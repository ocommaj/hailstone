import wreckData from '../assets/wreckLocations.json';

window.wreckFeatures = wreckData.features;

export default async function main() {
  const { default: FirebaseClient } = await import('./firebase')
  const { default: Map } = await import('./mapbox');
  const { default: urlQueryListener } = await import('./controllers');
  const { ControlWrapper } = await import('./components');
  const { controlWrapper, updateUserStatusBar } = ControlWrapper()

  document.body.appendChild(controlWrapper);
  window.updateUserStatusBar = updateUserStatusBar;

  FirebaseClient();
  Map();
  urlQueryListener();
}
