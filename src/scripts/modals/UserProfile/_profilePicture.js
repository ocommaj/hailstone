import maskIcon from '../../../assets/icons/diveMask.svg';
import plusIcon from '../../../assets/icons/plus-solid.svg';

const ONE_MB = 1048576;

export default function ProfilePicture(userData) {
  const profileImageWrapper = document.createElement('button');
  profileImageWrapper.classList.add('profileImageWrapperButton');

  const { profileImage } = ProfileImage(userData);
  const { hiddenFileInput, inputProxyClickHandler } = HiddenFileInput();
  const { buttonIcon } = ButtonIcon(inputProxyClickHandler);

  profileImageWrapper.addEventListener('click', inputProxyClickHandler);

  profileImageWrapper.appendChild(hiddenFileInput);
  profileImageWrapper.appendChild(profileImage);
  profileImageWrapper.appendChild(buttonIcon);

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

function ButtonIcon() {
  const buttonIcon = document.createElement('object');
  buttonIcon.classList.add('wrappedButtonIcon');
  buttonIcon.id = 'editImageButtonIcon';
  buttonIcon.innerHTML = 'User Icon';
  buttonIcon.tabIndex = -1;
  buttonIcon.type = "image/svg+xml";
  buttonIcon.data = plusIcon;

  return { buttonIcon }
}

function HiddenFileInput() {
  const hiddenFileInput = document.createElement('input');

  hiddenFileInput.id = 'profileImageUploadInput';
  hiddenFileInput.type = 'file';
  hiddenFileInput.accept = "image/png, image/jpeg";
  hiddenFileInput.multiple = false;
  hiddenFileInput.classList.add('hiddenFileInput');

  hiddenFileInput.addEventListener('change', handleFileInput)

  const inputProxyClickHandler = () => {
    const userProfileView = document.getElementById('userProfileView');
    if (userProfileView.classList.contains('editorMode')) {
       hiddenFileInput.click();
     }
  }

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
