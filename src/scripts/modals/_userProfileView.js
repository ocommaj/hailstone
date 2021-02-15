import GalleryImage from '../components/_galleryImage';

export default function UserProfileView(userData) {
  const {
    displayName,
    email,
    familyName,
    givenName,
    uploadRecords,
    pictureURL,
    providerId
  } = userData;

  //loadImages(uploadRecords);

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
  const displayNameValueText = document.createTextNode(`${displayName}`);

  displayNameWrapper.classList.add('displayNameWrapper');
  displayNameLabel.id = 'displayNameLabel';
  displayNameLabel.classList.add('profileViewLabel');
  displayNameValue.id = 'displayNameValue';
  displayNameValue.classList.add('profileViewValue');

  displayNameLabel.appendChild(displayNameLabelText);
  displayNameValue.appendChild(displayNameValueText);

  displayNameWrapper.appendChild(displayNameLabel);
  displayNameWrapper.appendChild(displayNameValue);

  const primaryContactLabel = document.createElement('h3');
  const primaryContactLabelText = document.createTextNode('Primary Contact:');
  const primaryContactValue = document.createElement('h3');
  const primaryContactValueText = document.createTextNode(`${email}`);

  const nameElementsWrapper = document.createElement('div');
  const firstNameWrapper = document.createElement('div');
  const lastNameWrapper = document.createElement('div');

  const firstNameLabel = document.createElement('h3');
  const firstNameLabelText = document.createTextNode('First Name:');
  const firstNameValue = document.createElement('h3');
  const firstNameValueText = document.createTextNode(`${givenName}`);

  const lastNameLabel = document.createElement('h3');
  const lastNameLabelText = document.createTextNode('Surname:');
  const lastNameValue = document.createElement('h3');
  const lastNameValueText = document.createTextNode(`${familyName}`);

  const uploadSectionLabel = document.createElement('h3');
  const uploadSectionLabelText = document.createTextNode('Your Posts:');
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
  firstNameValue.appendChild(firstNameValueText);

  lastNameLabel.appendChild(lastNameLabelText);
  lastNameValue.appendChild(lastNameValueText);

  firstNameWrapper.appendChild(firstNameLabel);
  firstNameWrapper.appendChild(firstNameValue);

  lastNameWrapper.appendChild(lastNameLabel);
  lastNameWrapper.appendChild(lastNameValue);

  nameElementsWrapper.appendChild(firstNameWrapper)
  nameElementsWrapper.appendChild(lastNameWrapper)

  primaryContactLabel.id = 'primaryContactLabel';
  primaryContactLabel.classList.add('profileViewLabel');

  primaryContactValue.id = 'primaryContactValue';
  primaryContactValue.classList.add('profileViewValue');

  primaryContactLabel.appendChild(primaryContactLabelText);
  primaryContactValue.appendChild(primaryContactValueText);

  detailInfoSectionWrapper.appendChild(primaryContactLabel);
  detailInfoSectionWrapper.appendChild(primaryContactValue);
  detailInfoSectionWrapper.appendChild(nameElementsWrapper);

  const bottomButtonsWrapper = document.createElement('div');
  const editProfileButton = document.createElement('button');
  const logoutButton = document.createElement('button');

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
  profileImage.src = pictureURL;

  displayInfoSectionWrapper.appendChild(profileImageWrapper);
  displayInfoSectionWrapper.appendChild(displayNameWrapper);
  profileContentElements.appendChild(displayInfoSectionWrapper);
  profileContentElements.appendChild(detailInfoSectionWrapper);
  profileContentElements.appendChild(uploadsSectionWrapper);

  uploadsSectionWrapper.appendChild(uploadSectionLabel);
  loadImages(uploadRecords, uploadsSectionWrapper);

  bottomButtonsWrapper.classList.add('bottomButtonsWrapper');
  editProfileButton.classList.add('editProfileButton');
  logoutButton.classList.add('logoutButton');
  editProfileButton.innerHTML = 'Edit Profile';
  logoutButton.innerHTML = 'Logout';
  logoutButton.addEventListener('click', logout);

  profileElementsWrapper.appendChild(profileContentElements);

  bottomButtonsWrapper.appendChild(editProfileButton);
  bottomButtonsWrapper.appendChild(logoutButton);

  userProfileView.appendChild(profileElementsWrapper);
  userProfileView.appendChild(bottomButtonsWrapper);

  return {
    userProfileView
  }
}

function logout() {
  const { activeModal: { remove }, firebaseClient: { signOut } } = window;
  window.userData = null;
  signOut().then(() => remove());
}

function loadImages(uploadRecords, wrapperElement) {
  if (!uploadRecords.length) return
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
