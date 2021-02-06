import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default function UserManager(authenticator) {
  const anonymousLogin = () => _anonymousLogin(authenticator);
  const listenForUserChange = () => _listenForUserChange(authenticator);
  const loginUI = () => new _loginUI(authenticator);

  return {
    anonymousLogin,
    listenForUserChange,
    loginUI
  }
}

function _loginUI(authenticator) {
  const loginUI = new firebaseui.auth.AuthUI(authenticator());
  const anonymousUser = authenticator().currentUser;
  const uiConfig = {
        signInSuccessUrl: 'hailstone.ocommaj.com' //'localhost:8080',
        signInFlow: 'popup',
        signInOptions: [
          authenticator.GoogleAuthProvider.PROVIDER_ID,
          authenticator.EmailAuthProvider.PROVIDER_ID,
        ],
      };

  this.start = (containerId) => loginUI.start(containerId, uiConfig);
}

function _anonymousLogin(authenticator) {
  authenticator().signInAnonymously()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error ${errorCode}:\n${errorMessage}`)
    })
}

function _listenForUserChange(authenticator) {
  authenticator().onAuthStateChanged((user) => {
    if (user) {
      window.user = user;

      if (!user.isAnonymous) {
        const containerId = 'firebaseui-auth-container';
        const container = document.getElementById(containerId);
        if (container) container.style.display = 'none';
      }
    } else {
      window.user = null;
    }
  })
}
