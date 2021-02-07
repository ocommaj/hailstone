import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import googleIcon from '../../assets/icons/google_alt.svg';

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
  var anonymousUser = authenticator().currentUser;
  const uiConfig = {
        autoUpgradeAnonymousUsers: true,
        signInSuccessUrl: '/', //'localhost:8080',
        signInFlow: 'popup',
        signInOptions: [
          {
            provider: 'google.com',
            providerName: 'Google',
            buttonColor: '#24a148',
            iconUrl: googleIcon
          },
          authenticator.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInFailure: function(error) {
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
              return Promise.resolve();
            }

            var cred = error.credential;
            return authenticator().signInWithCredential(cred);
          },
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          }
        }
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
