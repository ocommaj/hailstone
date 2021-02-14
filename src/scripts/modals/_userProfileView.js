export default function UserProfileView(userData) {
  const { displayName, email, familyName, givenName, pictureURL } = userData;

  const userProfileView = document.createElement('div');
  const profileElementsWrapper = document.createElement('div');
  const profileContentElements = document.createElement('div');

  const displayInfoSectionWrapper = document.createElement('div');

  const profileImageWrapper = document.createElement('div');
  const profileImage = document.createElement('img');

  const displayNameWrapper = document.createElement('div');
  const displayNameLabel = document.createElement('h3');
  const displayNameValue = document.createElement('h3');
  const primaryContactLabel = document.createElement('h3');
  const primaryContactValue = document.createElement('h3');

  displayNameWrapper.classList.add('displayNameWrapper');
  displayNameLabel.id = 'displayNameLabel';
  displayNameLabel.classList.add('profileViewLabel');
  displayNameValue.id = 'displayNameValue';
  displayNameValue.classList.add('profileViewValue');
  primaryContactLabel.id = 'primaryContactLabel';
  primaryContactLabel.classList.add('profileViewLabel');
  primaryContactValue.id = 'primaryContactValue';
  primaryContactValue.classList.add('profileViewValue');

  displayNameWrapper.appendChild(displayNameLabel);
  displayNameWrapper.appendChild(displayNameValue);
  //displayNameWrapper.appendChild(primaryContactLabel);
  //displayNameWrapper.appendChild(primaryContactValue);

  displayNameLabel.innerHTML = 'Display Name:';
  displayNameValue.innerHTML = `${displayName}`;
  primaryContactLabel.innerHTML = 'Primary Contact:';
  primaryContactValue.innerHTML = `${email}`;


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

  profileImageWrapper.classList.add('profileImageWrapper');
  profileImage.classList.add('profileImage');
  profileImageWrapper.appendChild(profileImage);
  profileImage.src = pictureURL;

  displayInfoSectionWrapper.appendChild(profileImageWrapper);
  displayInfoSectionWrapper.appendChild(displayNameWrapper);
  profileContentElements.appendChild(displayInfoSectionWrapper);

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
