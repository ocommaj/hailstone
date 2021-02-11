export default function ControlWrapper() {
  const controlWrapper = document.createElement('div');
  controlWrapper.classList.add('controlWrapper');
  controlWrapper.id = 'controlWrapper';
  controlWrapper.autofocus = true;
  controlWrapper.tabIndex = -1;

  return controlWrapper
}
