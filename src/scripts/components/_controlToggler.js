import BuoyIcon from './_buoyIcon';

export default function ControlToggler() {
  const button = document.createElement('button');
  const buoyIcon = BuoyIcon();

  button.classList.add('controlToggler');
  button.appendChild(buoyIcon)
  button.addEventListener('click', clickHandler);
  button.autofocus = true;

  return {
    element: button,
    switchToggler: toggleControlWrapper
  }

  function clickHandler() {
    toggleControlWrapper()
  }

  function toggleControlWrapper() {
    const controlWrapper = button.parentElement;
    controlWrapper.classList.toggle('collapsed');
  }
}
