const MAP_ORIGIN = [151.83, 7.35];

const cameraDefaults = {
  center: MAP_ORIGIN,
  zoom: 15.25,
  pitch: 75,
  bearing: 0,
  speed: 0.5,
  curve: 1,
}

const originView = {
  ...cameraDefaults,
  id: 'mapOrigin',
  zoom: 11.5,
  pitch: 40,
}

export default function flyCamera(map, { id='mapOrigin', target=originView }) {
  return new Promise(resolve => {
    const flyTarget = id === 'mapOrigin'
      ? target
      : { ...cameraDefaults, ...target }
    map.flyTo(flyTarget)
    map.on('moveend', resolve)
  })
}
