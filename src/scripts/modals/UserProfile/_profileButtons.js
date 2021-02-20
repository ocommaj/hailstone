export default function ProfileModalButtons() {
  const profileModalButtonsWrapper = document.createElement('div');
  const topButtonWrapper = document.createElement('div');
  const editProfileButton = document.createElement('button');
  const submitEditsButton = document.createElement('button');
  const logoutButton = document.createElement('button');

  editProfileButton.id = 'userProfileViewEditorButton';
  submitEditsButton.id = 'userProfileViewSubmitEditsButton';
  logoutButton.id = 'userProfileViewLogoutButton';

  profileModalButtonsWrapper.classList.add('bottomButtonsWrapper');
  topButtonWrapper.classList.add('stackedButtonsWrapper');
  editProfileButton.classList.add('editProfileButton');
  submitEditsButton.classList.add('editProfileButton');
  logoutButton.classList.add('logoutButton');
  editProfileButton.innerHTML = 'Edit Profile';
  submitEditsButton.innerHTML = 'Save Changes';
  editProfileButton.addEventListener('click', toggleEditMode);
  submitEditsButton.addEventListener('click', submitEdits);
  logoutButton.innerHTML = 'Logout';
  logoutButton.addEventListener('click', logout);

  topButtonWrapper.appendChild(editProfileButton);
  topButtonWrapper.appendChild(submitEditsButton);

  profileModalButtonsWrapper.appendChild(topButtonWrapper);
  profileModalButtonsWrapper.appendChild(logoutButton);

  return { profileModalButtonsWrapper }
}

function cancelEdit() {
  toggleEditMode()
}

function toggleEditMode() {
  const profileView = document.querySelector('.userProfileView');
  profileView.classList.toggle('editorMode');
  const editorShows = profileView.classList.contains('editorMode');
  if (editorShows) focusOnEditor()
  toggleLogoutCancelButton(editorShows)
}

function toggleLogoutCancelButton(editorShows=true) {
  const logoutBtn = document.getElementById('userProfileViewLogoutButton');
  if (!!editorShows) {
    logoutBtn.innerHTML = 'Cancel';
    logoutBtn.removeEventListener('click', logout);
    logoutBtn.addEventListener('click', cancelEdit);
  } else {
    logoutBtn.innerHTML = 'Logout';
    logoutBtn.removeEventListener('click', cancelEdit);
    logoutBtn.addEventListener('click', logout);
  }
}

function focusOnEditor(inputId=null) {
  const toFocus = !!inputId ? inputId : 'displayNameInput';
  const focusElement = document.getElementById(toFocus);
  focusElement.focus();
}

function logout() {
  const { activeModal: { remove }, firebaseClient: { signOut } } = window;
  window.userData = null;
  signOut().then(() => remove());
}

function submitEdits() {
  submitChanges().then(() => toggleEditMode())
}

function submitChanges() {
  return new Promise(resolve => {
    const { userData, firebaseClient: { updateUserRecord } } = window;
    const { uid, appHostedPictureURL } = userData;
    const displayNameEditor = document.getElementById('displayNameInput');
    const firstNameEditor = document.getElementById('firstNameInput');
    const lastNameEditor = document.getElementById('lastNameInput');

    const displayNameValue = document.getElementById('displayNameValue');
    const firstNameValue = document.getElementById('firstNameValue');
    const lastNameValue = document.getElementById('lastNameValue');

    const updatedValues = {
      displayName: displayNameEditor.value,
      givenName: firstNameEditor.value,
      familyName: lastNameEditor.value,
    }

    if (!!appHostedPictureURL) {
      updatedValues.appHostedPictureURL = appHostedPictureURL;
    }

    updateUserRecord({ uid, userData: updatedValues })
      .then((updatedData) => {
        window.userData = updatedData;
        displayNameValue.innerHTML = updatedData.displayName;
        firstNameValue.innerHTML = updatedData.givenName;
        lastNameValue.innerHTML = updatedData.familyName;
        resolve()
      })
  })
}
