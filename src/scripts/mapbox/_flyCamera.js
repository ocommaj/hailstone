const originView = {
  center: [151.83, 7.35],
  zoom: 11.5,
  pitch: 40,
  bearing: 0,
  speed: 0.5,
  curve: 1,
}


export default function flyCamera(map, { locationId=null }) {
  return new Promise((resolve) => {
    const flyTarget = !!locationId ? locationId.target : originView;
    map.flyTo(flyTarget)
    map.on('moveend', resolve)
  })
}
