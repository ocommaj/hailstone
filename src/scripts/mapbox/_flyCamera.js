const originView = {
  center: [151.83, 7.35],
  zoom: 11.5,
  pitch: 40,
  bearing: 0,
  speed: 0.5,
  curve: 1,
}


export default function flyCamera(map, { nextLocation=null }) {
  return new Promise((resolve) => {
    const flyTarget = !!nextLocation ? nextLocation : originView;
    map.flyTo(flyTarget)
    map.on('moveend', resolve)
  })
}
