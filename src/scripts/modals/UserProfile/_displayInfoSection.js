import maskIcon from '../../../assets/icons/diveMask.svg';

export default function DisplayInfoSection(userData) {
  const { displayName } = userData;

  const displayInfoSection = document.createElement('div');
  displayInfoSection.classList.add('profileViewSectionWrapper');
  displayInfoSection.id = 'displayInfoSectionWrapper';

  const displayNameWrapper = document.createElement('div');

  const displayNameLabel = document.createElement('h3');
  const displayNameLabelText = document.createTextNode('Display Name:');

  const displayNameValueInputWrapper = document.createElement('div');
  const displayNameValue = document.createElement('h3');
  const displayNameEditor = document.createElement('input');

  displayNameEditor.type = 'text';
  displayNameEditor.classList.add('profileViewInput');
  displayNameEditor.id = 'displayNameInput';
  displayNameEditor.value = displayName;
  displayNameEditor.required = true;

  displayNameValueInputWrapper.classList.add('valueInputWrapper');
  displayNameWrapper.classList.add('displayNameWrapper');
  displayNameLabel.id = 'displayNameLabel';
  displayNameLabel.classList.add('profileViewLabel');
  displayNameValue.id = 'displayNameValue';
  displayNameValue.classList.add('profileViewValue');

  displayNameLabel.appendChild(displayNameLabelText);
  displayNameValue.innerHTML = `${displayName}`;

  displayNameValueInputWrapper.appendChild(displayNameValue);
  displayNameValueInputWrapper.appendChild(displayNameEditor);

  displayNameWrapper.appendChild(displayNameLabel);
  displayNameWrapper.appendChild(displayNameValueInputWrapper);

  const profileImageWrapper = document.createElement('div');
  const { profileImage } = ProfileImage(userData);

  const editImageButton = document.createElement('button');
  const hiddenFileInput = document.createElement('input');

  hiddenFileInput.type = 'file';
  hiddenFileInput.id = 'profileImageUploadInput';
  hiddenFileInput.accept = "image/png, image/jpeg";
  hiddenFileInput.multiple = false;
  hiddenFileInput.classList.add('hiddenFileInput');
  profileImageWrapper.appendChild(hiddenFileInput);

  editImageButton.id = 'editImageButton';
  editImageButton.classList.add('editImageButton');

  hiddenFileInput.addEventListener('change', handleFileInput)

  editImageButton.addEventListener('click', () => {
    hiddenFileInput.click()
  })

  profileImageWrapper.classList.add('profileImageWrapper');

  profileImageWrapper.appendChild(profileImage);

  editImageButton.innerHTML = `<i class="fas fa-plus"></i>`;
  profileImageWrapper.appendChild(editImageButton);

  displayInfoSection.appendChild(profileImageWrapper);
  displayInfoSection.appendChild(displayNameWrapper);


  return { displayInfoSection }
}

function ProfileImage({ pictureURL, appHostedPictureURL }) {
  const profileImage = document.createElement('img');
  profileImage.classList.add('profileImage');
  profileImage.alt = 'Profile picture';

  profileImage.addEventListener('error', showFallbackIcon)

  if (!pictureURL && !appHostedPictureURL) {
    showFallbackIcon();
    return { profileImage }
  }

  if (!!appHostedPictureURL) {
    showAppHostedProfilePic()
    return { profileImage }
  }

  else {
    profileImage.src = pictureURL;
    return { profileImage }
  }

  function showFallbackIcon() {
    profileImage.src = maskIcon;
    profileImage.style.padding = '.5rem';
  }

  function showAppHostedProfilePic() {
    const { firebaseClient: { getProfileImage } } = window;
    getProfileImage({ storagePath: appHostedPictureURL })
      .then((url) => { profileImage.src = url })
      .catch((error) => {
        console.error(error)
        showFallbackIcon()
      })
  }
}

function handleFileInput(e) {
  const {
    userData,
    user: { uid },
    firebaseClient: { uploadProfileImage }
  } = window;
  const imgElement = document.querySelector('.profileImage')
  const fileInput = e.target;
  if (e.target.validity.valid) {
    const userFile = fileInput.files[0];
    if (validateFileSize(userFile)) {
      const pathRoot = 'publicAssets/userProfileImages';
      const storagePath = `${pathRoot}/${uid}/${userFile.name}`;
      imgElement.style.padding = 0;
      imgElement.src = URL.createObjectURL(userFile);
      uploadProfileImage({ storagePath, userFile })
        .then(() => { userData.appHostedPictureURL = storagePath })
        .catch((error) => {
          console.error(error);
          imgElement.style.padding = '.5rem';
          imgElement.src = maskIcon;
        })
    }
  }
}

function validateFileSize(file) {
  return (file.size < 1048576)
}
