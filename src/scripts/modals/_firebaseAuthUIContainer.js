export default function FirebaseAuthUIContainer() {
  const firebaseAuthUIContainer = document.createElement('div');
  firebaseAuthUIContainer.id = "firebaseui-auth-container";
  firebaseAuthUIContainer.style.display = 'none';

  this.start = startUI;
  this.element = firebaseAuthUIContainer;

  function startUI() {
    const { firebaseClient: { loginUI } } = window;
    firebaseAuthUIContainer.style.display = 'flex';
    loginUI.start();
  }

}
