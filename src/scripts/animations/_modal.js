const REM_VALUE = 16;

const tlDefaults = {
  transformOrigin: 'center center',
  duration: .8
}

export default function animations(gsap) {
  return {
    reveal: (args) => _reveal(gsap, args),
    replace: (args) => _replace(gsap, args),
    collapse: (args) => _collapse(gsap, args)
  }
}

function _reveal(gsap, { modal, fromPoint }) {
  const { x, y } = fromPoint;
  const { top, bottom, right, left } = modal.getBoundingClientRect();
  const deltaX = x - left;
  const deltaY = y - top;

  const windowHeight = window.innerHeight;
  const offsetCount = windowHeight < 720 ? 3 : 6;
  const offset = REM_VALUE * offsetCount

  const tl = gsap.timeline({ defaults: tlDefaults })
    .from(modal, { x: deltaX, y: deltaY, width: 0 })
    .to(modal, { height: windowHeight - offset, opacity: 1 }, '<')
    .from(modal.children, { opacity: 0 });
}

function _collapse(gsap, { modal, onComplete }) {
  const tl = gsap.timeline({ onComplete, defaults: tlDefaults })
    .to(modal.children, { opacity: 0, duration: .4 })
    .to(modal, { height: 0 }, '<.3' )
    .to(modal, { opacity: 0, duration: .6 }, '<');
}

function _replace(gsap, { incoming, outgoing }) {
  const windowHeight = window.innerHeight;
  const offsetCount = windowHeight < 720 ? 3 : 6;
  const offset = REM_VALUE * offsetCount

  const tl = gsap.timeline({ defaults: tlDefaults })
    .to(outgoing, { opacity: 0, duration: .4 })
    .set(incoming, { height: windowHeight - offset }, '<.2')
    .to(incoming, { opacity: 1, duration: .4 }, '<')
    .call(() => outgoing.remove())
}
