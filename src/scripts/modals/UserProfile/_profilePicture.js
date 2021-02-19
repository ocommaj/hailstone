import maskIcon from '../../../assets/icons/diveMask.svg';

const ONE_MB = 1048576;

export default function ProfilePicture(userData) {
  const profileImageWrapper = document.createElement('div');
  profileImageWrapper.classList.add('profileImageWrapper');

  const { profileImage } = ProfileImage(userData);
  const { hiddenFileInput, inputProxyClickHandler } = HiddenFileInput();
  const { editImageButton } = EditImageButton(inputProxyClickHandler);

  profileImageWrapper.appendChild(profileImage);
  profileImageWrapper.appendChild(editImageButton);
  profileImageWrapper.appendChild(hiddenFileInput);

  return { profilePicture: profileImageWrapper }
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

function EditImageButton(inputClickHandler) {
  const editImageButton = document.createElement('button');

  editImageButton.id = 'editImageButton';
  editImageButton.classList.add('editImageButton');
  editImageButton.innerHTML = `<i class="fas fa-plus"></i>`;

  editImageButton.addEventListener('click', inputClickHandler)

  return { editImageButton }
}

function HiddenFileInput() {
  const hiddenFileInput = document.createElement('input');

  hiddenFileInput.id = 'profileImageUploadInput';
  hiddenFileInput.type = 'file';
  hiddenFileInput.accept = "image/png, image/jpeg";
  hiddenFileInput.multiple = false;
  hiddenFileInput.classList.add('hiddenFileInput');

  hiddenFileInput.addEventListener('change', handleFileInput)

  const inputProxyClickHandler = () => hiddenFileInput.click()

  return { hiddenFileInput, inputProxyClickHandler }

  function handleFileInput(e) {
    const { userData, firebaseClient: { uploadProfileImage } } = window;
    const imgElement = document.querySelector('.profileImage')
    const fileInput = e.target;

    if (fileInput.validity.valid) {
      const userFile = fileInput.files[0];
      if (validateFileSize(userFile)) {
        const pathRoot = 'publicAssets/userProfileImages';
        const storagePath = `${pathRoot}/${userData.uid}/${userFile.name}`;
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

    function validateFileSize(file) {
      return (file.size < ONE_MB)
    }
  }
}
