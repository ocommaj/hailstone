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
          authenticator.TwitterAuthProvider.PROVIDER_ID,
          authenticator.FacebookAuthProvider.PROVIDER_ID,
          authenticator.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInFailure: function(error) {
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
              return Promise.resolve();
            }

            var cred = error.credential;
            return authenticator().signInWithCredential(cred)
          },
        }
    };

  if (loginUI.isPendingRedirect()) {
    loginUI.start('#firebaseui-auth-container', uiConfig);
  }

  this.start = () => loginUI.start('#firebaseui-auth-container', uiConfig);

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
        if (container && container.style.display !== 'none') {
          window.hideAuthUI()
          return
        }
      }
    }
})
}
