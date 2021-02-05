import { gsap } from 'gsap';

const REM_VALUE = 16;

const tlDefaults = {
  transformOrigin: 'center center',
  duration: .8
}

const animations = {
  reveal,
  collapse,
  replace
}

export default animations;

function reveal(element, fromPoint) {
  const { x, y } = fromPoint;
  const { top, bottom, right, left } = element.getBoundingClientRect();
  const deltaX = x - left;
  const deltaY = y - top;

  const windowHeight = window.innerHeight;
  const offsetCount = window.isMobileUser ? 4 : 6;
  const offset = REM_VALUE * offsetCount

  const tl = gsap.timeline({ defaults: tlDefaults })
    .from(element, { x: deltaX, y: deltaY, width: 0 })
    .to(element, { height: windowHeight - offset, opacity: 1 }, '<')
    .from(element.children, { opacity: 0 });
}

function collapse(element, onComplete) {
  const tl = gsap.timeline({ onComplete, defaults: tlDefaults })
    .to(element.children, { opacity: 0, duration: .4 })
    .to(element, { height: 0 }, '<.3' )
    .to(element, { opacity: 0, duration: .6 }, '<');
}

function replace(incoming, outgoing) {
  const windowHeight = window.innerHeight;
  const offsetCount = window.isMobileUser ? 4 : 6;
  const offset = REM_VALUE * offsetCount;
  
  const tl = gsap.timeline({ defaults: tlDefaults })
    .to(outgoing, { opacity: 0, duration: .4 })
    .set(incoming, { height: windowHeight - offset }, '<.2')
    .to(incoming, { opacity: 1, duration: .4 }, '<')
    .call(() => outgoing.remove())
}
