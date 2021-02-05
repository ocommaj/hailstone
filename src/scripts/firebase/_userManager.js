export default function UserManager(authenticator) {
  const anonymousLogin = () => _anonymousLogin(authenticator);
  const listenForUserChange = () => _listenForUserChange(authenticator);

  return {
    anonymousLogin,
    listenForUserChange
  }
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
  authenticator.onAuthStateChanged((user) => {
    if (user) {
      window.user = user;
    } else {
      window.user = null;
    }
  })
}
