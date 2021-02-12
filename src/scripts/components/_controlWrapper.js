import ControlToggler from './_controlToggler';
import SearchBar from './_searchBar';
import UserStatusBar from './_userStatusBar';

export default function ControlWrapper() {
  const { element: searchBar } = new SearchBar()
  const { userStatusBar, update: updateUserStatusBar } = new UserStatusBar()

  const controlWrapper = document.createElement('div');
  controlWrapper.classList.add('controlWrapper');
  controlWrapper.id = 'controlWrapper';
  controlWrapper.autofocus = true;
  controlWrapper.tabIndex = -1;

  if ( shouldUseSmallScreenMode() ) {
    const { switchToggler, element: wrapperToggler } = new ControlToggler()
    controlWrapper.appendChild(wrapperToggler);
    controlWrapper.appendChild(searchBar);
    controlWrapper.appendChild(userStatusBar);

    
    controlWrapper.classList.add('usingSmallScreenMode');
    controlWrapper.classList.add('collapsed');
    document.addEventListener('click', clickOutside);

  } else {
    controlWrapper.appendChild(userStatusBar)
    controlWrapper.appendChild(searchBar)
  }

  this.controlWrapper = controlWrapper;
  this.updateUserStatusBar = updateUserStatusBar;
}

function shouldUseSmallScreenMode() {
  return (window.innerWidth <= 428)
}

function clickOutside(e) {
  const controlWrapper = document.getElementById('controlWrapper');
  if (controlWrapper.classList.contains('collapsed')) return

  if (!controlWrapper.contains(e.target)) {
    controlWrapper.classList.add('collapsed')
  }
}
