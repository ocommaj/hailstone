import ControlToggler from './_controlToggler';
import SearchBar from './_searchBar';
import UserStatusBar from './_userStatusBar';

export default function ControlWrapper() {
  const { searchBar } = SearchBar()
  const { userStatusBar, updateUserStatusBar } = UserStatusBar()

  const controlWrapper = document.createElement('main');
  controlWrapper.classList.add('controlWrapper');
  controlWrapper.id = 'controlWrapper';
  controlWrapper.autofocus = true;
  
  if ( shouldUseSmallScreenMode() ) {
    const { switchToggler, element: wrapperToggler } = ControlToggler()
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

  return {
    controlWrapper,
    updateUserStatusBar
  }
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
