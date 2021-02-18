import maskIcon from '../../../assets/icons/diveMask.svg';
import GalleryImage from '../../components/_galleryImage';
import ProfileModalButtons from './_profileButtons';

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
  const { profileModalButtonsWrapper } = ProfileModalButtons();

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

  const headline = document.createElement('h2');
  headline.classList.add('userProfileHeadline');
  headline.innerHTML = "Profile Information";
  profileContentElements.appendChild(headline);

  userProfileView.tabIndex = -1;
  profileElementsWrapper.tabIndex = -1;
  profileContentElements.tabIndex = -1;
  displayInfoSectionWrapper.tabIndex = -1;

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

  loadImages(uploadRecords, uploadsSectionWrapper);

  displayInfoSectionWrapper.appendChild(profileImageWrapper);
  displayInfoSectionWrapper.appendChild(displayNameWrapper);
  profileContentElements.appendChild(displayInfoSectionWrapper);
  profileContentElements.appendChild(detailInfoSectionWrapper);
  profileContentElements.appendChild(uploadsSectionWrapper);
  uploadsSectionWrapper.appendChild(uploadSectionLabel);
  profileElementsWrapper.appendChild(profileContentElements);
  userProfileView.appendChild(profileElementsWrapper);
  userProfileView.appendChild(profileModalButtonsWrapper);

  return { userProfileView }
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
