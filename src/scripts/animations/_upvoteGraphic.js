
export default function animation(gsap) {
  return { run: (args) => _run(gsap, args) }
}

function _run(gsap, { graphic }) {
  return gsap.timeline()
    .to(graphic, { y: '-=200', duration: 2.4 })
    .to(graphic, { color: 'rgba(244,244,244,1)', duration: .6 }, '<.2')
    .to(graphic, { color: 'rgba(244,244,244,0)', duration: .8 }, '<.4')
    .set(graphic, { y: '+=200' })
}
