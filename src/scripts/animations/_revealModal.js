import { gsap } from 'gsap';

export default function revealModal(element, fromPoint) {
  const { x, y } = fromPoint;
  const { top, bottom, right, left } = element.getBoundingClientRect();
  const deltaX = x - left;
  const deltaY = y - top;
  console.log(deltaX)

  const tl = gsap.timeline({
    defaults: {
      transformOrigin: 'center center'
    }
  });
  tl.from(element, { x: deltaX, y: deltaY, height: 0, width: 0, duration: .8 })
    .to(element.children, { opacity: 1 })
}
