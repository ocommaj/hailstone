import maskIcon from '../../../assets/icons/diveMask.svg';
import GalleryImage from '../../components/_galleryImage';

export default function UserProfileView(userData) {
  const {
    displayName,
    email,
    familyName,
    givenName,
    uploadRecords,
    pictureURL,
    providerId,
    username
  } = userData;

  const primaryContact = providerId === 'twitter.com' ? username : email;

  const userProfileView = document.createElement('div');
  const profileElementsWrapper = document.createElement('div');
  const profileContentElements = document.createElement('div');

  const displayInfoSectionWrapper = document.createElement('div');
  const detailInfoSectionWrapper = document.createElement('div');
  const uploadsSectionWrapper = document.createElement('div');

  const profileImageWrapper = document.createElement('div');
  const profileImage = document.createElement('img');

  const displayNameWrapper = document.createElement('div');
  const displayNameLabel = document.createElement('h3');
  const displayNameLabelText = document.createTextNode('Display Name:');
  const displayNameValue = document.createElement('h3');

  const displayNameEditor = document.createElement('input');
  displayNameEditor.type = 'text';
  displayNameEditor.classList.add('profileViewInput');
  displayNameEditor.id = 'displayNameInput';
  displayNameEditor.value = displayName;
  displayNameEditor.required = true;

  displayNameWrapper.classList.add('displayNameWrapper');
  displayNameLabel.id = 'displayNameLabel';
  displayNameLabel.classList.add('profileViewLabel');
  displayNameValue.id = 'displayNameValue';
  displayNameValue.classList.add('profileViewValue');

  displayNameLabel.appendChild(displayNameLabelText);
  displayNameValue.innerHTML = `${displayName}`

  const displayNameValueInputWrapper = document.createElement('div');
  displayNameValueInputWrapper.classList.add('valueInputWrapper');

  displayNameValueInputWrapper.appendChild(displayNameValue);
  displayNameValueInputWrapper.appendChild(displayNameEditor);

  displayNameWrapper.appendChild(displayNameLabel);
  displayNameWrapper.appendChild(displayNameValueInputWrapper);

  const primaryContactLabel = document.createElement('h3');
  const primaryContactLabelText = document.createTextNode('Primary Contact:');
  const primaryContactValue = document.createElement('h3');

  const primaryContactEditor = document.createElement('input');
  primaryContactEditor.type = 'text';
  primaryContactEditor.classList.add('profileViewInput');
  primaryContactEditor.id = 'primaryContactInput';
  primaryContactEditor.value = primaryContact;

  const primaryContactValueInputWrapper = document.createElement('div');
  primaryContactValueInputWrapper.classList.add('valueInputWrapper');

  const nameElementsWrapper = document.createElement('div');
  const firstNameWrapper = document.createElement('div');
  const lastNameWrapper = document.createElement('div');

  const firstNameLabel = document.createElement('h3');
  const firstNameLabelText = document.createTextNode('First Name:');
  const firstNameValue = document.createElement('h3');

  const firstNameEditor = document.createElement('input');
  firstNameEditor.type = 'text';
  firstNameEditor.classList.add('profileViewInput');
  firstNameEditor.id = 'firstNameInput';
  firstNameEditor.value = givenName;

  const firstNameValueInputWrapper = document.createElement('div');
  firstNameValueInputWrapper.classList.add('valueInputWrapper');

  const lastNameLabel = document.createElement('h3');
  const lastNameLabelText = document.createTextNode('Family Name:');
  const lastNameValue = document.createElement('h3');

  const lastNameEditor = document.createElement('input');
  lastNameEditor.type = 'text';
  lastNameEditor.classList.add('profileViewInput');
  lastNameEditor.id = 'familyNameInput';
  lastNameEditor.value = familyName;

  const lastNameValueInputWrapper = document.createElement('div');
  lastNameValueInputWrapper.classList.add('valueInputWrapper');

  const uploadSectionLabel = document.createElement('h3');
  const uploadSectionLabelText = document.createTextNode('Your Photos:');
  uploadSectionLabel.id = 'uploadSectionLabel';
  uploadSectionLabel.classList.add('profileViewLabel');
  uploadSectionLabel.appendChild(uploadSectionLabelText);

  nameElementsWrapper.id = 'nameElementsWrapper';
  firstNameWrapper.id = 'firstNameWrapper';
  lastNameWrapper.id = 'lastNameWrapper';

  firstNameLabel.id = 'firstNameLabel';
  firstNameLabel.classList.add('profileViewLabel');
  firstNameValue.id = 'firstNameValue';
  firstNameValue.classList.add('profileViewValue');

  lastNameLabel.id = 'lastNameLabel';
  lastNameLabel.classList.add('profileViewLabel');
  lastNameValue.id = 'lastNameValue';
  lastNameValue.classList.add('profileViewValue');

  firstNameLabel.appendChild(firstNameLabelText);
  firstNameValue.innerHTML = `${givenName}`;

  lastNameLabel.appendChild(lastNameLabelText);
  lastNameValue.innerHTML = `${familyName}`;

  firstNameValueInputWrapper.appendChild(firstNameValue);
  firstNameValueInputWrapper.appendChild(firstNameEditor);

  firstNameWrapper.appendChild(firstNameLabel);
  firstNameWrapper.appendChild(firstNameValueInputWrapper);

  lastNameValueInputWrapper.appendChild(lastNameValue);
  lastNameValueInputWrapper.appendChild(lastNameEditor);

  lastNameWrapper.appendChild(lastNameLabel);
  lastNameWrapper.appendChild(lastNameValueInputWrapper);

  nameElementsWrapper.appendChild(firstNameWrapper)
  nameElementsWrapper.appendChild(lastNameWrapper)

  primaryContactLabel.id = 'primaryContactLabel';
  primaryContactLabel.classList.add('profileViewLabel');

  primaryContactValue.id = 'primaryContactValue';
  primaryContactValue.classList.add('profileViewValue');


  primaryContactLabel.appendChild(primaryContactLabelText);
  primaryContactValue.innerHTML = `${primaryContact}`;

  primaryContactValueInputWrapper.appendChild(primaryContactValue);
  //primaryContactValueInputWrapper.appendChild(primaryContactEditor);

  detailInfoSectionWrapper.appendChild(primaryContactLabel);
  detailInfoSectionWrapper.appendChild(primaryContactValueInputWrapper);
  detailInfoSectionWrapper.appendChild(nameElementsWrapper);

  const bottomButtonsWrapper = document.createElement('div');
  const topButtonWrapper = document.createElement('div');
  const editProfileButton = document.createElement('button');
  const submitEditsButton = document.createElement('button');
  const logoutButton = document.createElement('button');

  editProfileButton.id = 'userProfileViewEditorButton';
  submitEditsButton.id = 'userProfileViewSubmitEditsButton';
  logoutButton.id = 'userProfileViewLogoutButton';

  const headline = document.createElement('h2');
  headline.classList.add('userProfileHeadline');
  headline.innerHTML = "Profile Information";
  profileContentElements.appendChild(headline);

  userProfileView.tabIndex = -1;
  profileElementsWrapper.tabIndex = -1;
  profileContentElements.tabIndex = -1;
  displayInfoSectionWrapper.tabIndex = -1;
  bottomButtonsWrapper.tabIndex = -1;

  userProfileView.classList.add('userProfileView');
  profileElementsWrapper.classList.add('profileElementsWrapper');
  profileContentElements.classList.add('profileContentElements');
  displayInfoSectionWrapper.classList.add('profileViewSectionWrapper');
  displayInfoSectionWrapper.id = 'displayInfoSectionWrapper';
  detailInfoSectionWrapper.classList.add('profileViewSectionWrapper');
  uploadsSectionWrapper.id = 'uploadsSectionWrapper';
  uploadsSectionWrapper.classList.add('profileViewSectionWrapper');

  profileImageWrapper.classList.add('profileImageWrapper');
  profileImage.classList.add('profileImage');
  profileImageWrapper.appendChild(profileImage);
  profileImage.alt = 'profile image';
  profileImage.src = !!pictureURL ? pictureURL : maskIcon;
  if (!pictureURL) {
    profileImage.style.padding = '.5rem';
  }

  profileImage.addEventListener('error', () => {
    profileImage.src = maskIcon;
    profileImage.style.padding = '.5rem';
  })

  displayInfoSectionWrapper.appendChild(profileImageWrapper);
  displayInfoSectionWrapper.appendChild(displayNameWrapper);
  profileContentElements.appendChild(displayInfoSectionWrapper);
  profileContentElements.appendChild(detailInfoSectionWrapper);
  profileContentElements.appendChild(uploadsSectionWrapper);

  uploadsSectionWrapper.appendChild(uploadSectionLabel);
  loadImages(uploadRecords, uploadsSectionWrapper);

  bottomButtonsWrapper.classList.add('bottomButtonsWrapper');
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

  profileElementsWrapper.appendChild(profileContentElements);


  topButtonWrapper.appendChild(editProfileButton);
  topButtonWrapper.appendChild(submitEditsButton);

  bottomButtonsWrapper.appendChild(topButtonWrapper);
  bottomButtonsWrapper.appendChild(logoutButton);

  userProfileView.appendChild(profileElementsWrapper);
  userProfileView.appendChild(bottomButtonsWrapper);

  return {
    userProfileView
  }
}

function toggleEditMode() {
  const profileView = document.querySelector('.userProfileView');
  profileView.classList.toggle('editorMode');
  const editorShows = profileView.classList.contains('editorMode');
  if (editorShows) focusOnEditor()
  toggleLogoutCancelButton(editorShows)
}

function focusOnEditor(inputId=null) {
  const toFocus = !!inputId ? inputId : 'displayNameInput';
  const focusElement = document.getElementById(toFocus);
  focusElement.focus();
}

function toggleEditSubmitButton({ editorShows=true }) {
  const editBtn = document.getElementById('userProfileViewEditorButton');
  if (!!editorShows) {
    editBtn.innerHTML = 'Save Changes';
    editBtn.removeEventListener('click', toggleEditMode);
    editBtn.addEventListener('click', submitChanges);
  } else {
    editBtn.innerHTML = 'Edit Profile';
    editBtn.removeEventListener('click', submitChanges);
    editBtn.addEventListener('click', toggleEditMode);
  }
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

function cancelEdit() {
  toggleEditMode()
  revertButtonToLogoutMode()
}

function revertButtonToLogoutMode() {
  const logoutBtn = document.getElementById('userProfileViewLogoutButton');
  logoutBtn.innerHTML = 'Logout';
  logoutBtn.removeEventListener('click', cancelEdit);
  logoutBtn.addEventListener('click', logout);
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
  const { user: { uid }, firebaseClient: { updateUserRecord } } = window;
  const displayNameEditor = document.getElementById('displayNameInput');
  const firstNameEditor = document.getElementById('firstNameInput');
  const lastNameEditor = document.getElementById('familyNameInput');

  const displayNameValue = document.getElementById('displayNameValue');
  const firstNameValue = document.getElementById('firstNameValue');
  const lastNameValue = document.getElementById('lastNameValue');

  const updatedValues = {
    displayName: displayNameEditor.value,
    givenName: firstNameEditor.value,
    familyName: lastNameEditor.value,
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

function loadImages(uploadRecords, wrapperElement) {
  if (!uploadRecords) {
    wrapperElement.appendChild(altText())
    return
  }
  const { firebaseClient: { loadImagesFromDB } } = window;
  const domCallback = (config) => {
    config.applauseButton=false;
    wrapperElement.append(GalleryImage(config))
  }

  const sortedRecords = sortUploadRecords(uploadRecords);
  for (const [wreckID, imgIDs] of Object.entries(sortedRecords)) {
    loadImagesFromDB({
      domCallback,
      gallery: wreckID,
      filterIDs: imgIDs
    });
  }

  function altText() {
    const uploadSectionAltText = document.createElement('h3');
    const uploadSectionAltTextValue = document
      .createTextNode('Photos you post will appear here.');
    uploadSectionAltText.id = 'uploadSectionAltText';
    uploadSectionAltText.classList.add('profileViewValue');
    uploadSectionAltText.appendChild(uploadSectionAltTextValue);
    return uploadSectionAltText;
  }
}

function sortUploadRecords(uploadRecords) {
  return uploadRecords.reduce((accumulator, record) => {
    if (!accumulator[record.wreckId]) {
      accumulator[record.wreckId] = [record.imgId];
    } else {
      accumulator[record.wreckId].push(record.imgId);
    }
    return accumulator;
  }, {})
}
