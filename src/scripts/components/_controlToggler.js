export default function ControlToggler() {
  const button = document.createElement('button');
  const buttonIcon = document.createElement('i');

  button.classList.add('controlToggler');
  buttonIcon.classList.add('buttonIcon', 'fas', 'fa-water');
  buttonIcon.tabIndex = -1;

  button.appendChild(buttonIcon);
  button.addEventListener('click', clickHandler);
  button.autofocus = true;

  this.element = button;
  this.switchToggler = toggleControlWrapper;

  function clickHandler(e) {
    toggleControlWrapper()
  }

  function toggleControlWrapper() {
    const controlWrapper = button.parentElement;
    controlWrapper.classList.toggle('collapsed');
  }
}
