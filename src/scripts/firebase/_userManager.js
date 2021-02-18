import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import googleIcon from '../../assets/icons/google_alt.svg';

export default function UserManager(authenticator, authProviders) {
  const anonymousLogin = () => _anonymousLogin(authenticator);
  const listenForUserChange = () => _listenForUserChange(authenticator);
  const loginUI = () => new _loginUI(authenticator, authProviders);
  const signOut = () => _signOut(authenticator);

  return {
    anonymousLogin,
    listenForUserChange,
    loginUI,
    signOut,
  }
}

function _loginUI(authenticator, authProviders) {
  const elementId = 'firebaseui-auth-container'
  const loginUI = new firebaseui.auth.AuthUI(authenticator);
  var anonymousUser = authenticator.currentUser;


  const uiConfig = {
        autoUpgradeAnonymousUsers: true,
        signInSuccessUrl: '/',
        signInFlow: 'popup',
        signInOptions: [
          //'apple.com',
          {
            provider: authProviders.google,
            providerName: 'Google',
            buttonColor: '#24a148',
            iconUrl: googleIcon,
          },
          authProviders.twitter,
          //authProviders.facebook,
          authProviders.email,
        ],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult) {
              //console.dir(authResult.additionalUserInfo)
              //console.dir(authResult.user)

              authenticator.updateCurrentUser(authResult.user)
                .then(() => {
                  createUserRecord(authResult)
                  window.hideAuthUI()
                  return false;
                })
            },
          signInFailure: function(error) {
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
              return Promise.resolve();
            }

            var cred = error.credential;
            return authenticator.signInWithCredential(cred)
          }
        }
    };

  if (loginUI.isPendingRedirect()) {
    loginUI.start('#firebaseui-auth-container', uiConfig);
  }

  this.start = () => loginUI.start('#firebaseui-auth-container', uiConfig);

}

function _anonymousLogin(authenticator) {
  authenticator.signInAnonymously()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error ${errorCode}:\n${errorMessage}`)
    })
}

function _listenForUserChange(authenticator) {
  authenticator.onIdTokenChanged((user) => {
    if (user) {
      window.user = user;
      if (user.isAnonymous) {
        window.userData = null;
        window.updateUserStatusBar()
      }

      if (!user.isAnonymous) {
        const queryUserRecord = window.firebaseClient.queryUserRecord;
        queryUserRecord(user.uid)
          .then((userData) => {
            window.userData = userData;
            window.updateUserStatusBar();
          })
        const containerId = 'firebaseui-auth-container';
        const container = document.getElementById(containerId);
        if (container && container.style.display !== 'none') {
          window.hideAuthUI()
        }
      }
    }
  })
}

function _signOut(authenticator) {
  return new Promise((resolve) => {
      authenticator.signOut().then(() => _anonymousLogin(authenticator))
      resolve()
  })
}

function handleAppleSignIn(newUser) {

}

function createUserRecord(newUser) {
  const createRecord = window.firebaseClient.createUserRecord;
  const { user: { uid, email, displayName }, additionalUserInfo } = newUser;
  const { providerId, profile, username } = additionalUserInfo;

  const userConfig = {
    uid,
    providerId,
    ...parseProfileInfo({ providerId, profile, email, displayName })
  }

  if (username) { userConfig.username = `@${username}` }

  createRecord(userConfig);
}

function parseProfileInfo({ providerId, profile, email, displayName }) {
  const parsers = {
    'google.com': () => parseGoogleProfile(profile, email),
    'twitter.com': () => parseTwitterProfile(profile),
    'facebook.com': () => parseFacebookProfile(profile),
    'password': () => parseEmailPasswordProfile(email, displayName)
  }

  const parser = parsers[providerId]
  return parser()
}

function parseGoogleProfile(profile, email) {
  const userData = {
    email,
    familyName: profile.family_name,
    givenName: profile.given_name,
    pictureURL: profile.picture,
    displayName: profile.name
  }
  return userData;
}

function parseTwitterProfile(profile) {
  const displayName = profile.name;
  const { givenName, familyName } = splitFullName(displayName);
  const userData = {
    displayName,
    givenName,
    familyName,
    pictureURL: profile.profile_image_url_https,
  }
  return userData;
}

function parseFacebookProfile(profile) {
  const userData = {
    email: profile.email,
    givenName: profile.first_name,
    familyName: profile.last_name,
    displayName: profile.name,
    pictureURL: profile.picture.data.url,
  }
  return userData;
}

function parseAppleProfile(profile) {
  const userData = {
    email: profile.email,
    privateEmail: profile.is_private_email,
  }
}

function parseEmailPasswordProfile(email, displayName) {
  const { givenName, familyName } = splitFullName(displayName);
  const userData = {
    email,
    givenName,
    familyName,
    displayName
  }
  return userData


}

function splitFullName(fullName) {
  const split = fullName.split(' ');
  return { givenName: split[0], familyName: split[1] }
}
