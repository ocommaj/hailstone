import { gsap } from 'gsap';

const tlDefaults = {
  transformOrigin: 'center center',
  duration: .8
}

const animations = {
  reveal,
  collapse
}

export default animations;

function reveal(element, fromPoint) {
  const { x, y } = fromPoint;
  const { top, bottom, right, left } = element.getBoundingClientRect();
  const deltaX = x - left;
  const deltaY = y - top;

  const tl = gsap.timeline({ defaults: tlDefaults })
    .from(element, { x: deltaX, y: deltaY, height: 0, width: 0, opacity: 0 })
    .from(element.children, { opacity: 0 });
}

function collapse(element, onComplete) {
  const tl = gsap.timeline({ onComplete, defaults: tlDefaults })
    .to(element.children, { opacity: 0, duration: .4 })
    .to(element, { height: 0 }, '<.3' );
}
