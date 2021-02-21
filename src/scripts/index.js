import wreckData from '../assets/wreckLocations.json';

window.wreckFeatures = wreckData.features;

export default async function main() {
  const { default: FirebaseClient } = await
    import(/* webpackPrefetch: true */'./firebase');
  const { default: Map } = await
    import(/* webpackPrefetch: true */'./mapbox');
  const { default: urlQueryListener } = await
    import(/* webpackPrefetch: true */'./controllers');
  const { ControlWrapper } = await
    import(/* webpackPrefetch: true */'./components');
  const { controlWrapper, updateUserStatusBar } = ControlWrapper()

  document.body.appendChild(controlWrapper);
  window.updateUserStatusBar = updateUserStatusBar;

  FirebaseClient();
  Map();
  urlQueryListener();
}
