import maskIcon from '../../../assets/icons/diveMask.svg';

export default function DisplayInfoSection({ displayName, pictureURL }) {
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
  const profileImage = document.createElement('img');

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
  profileImage.classList.add('profileImage');
  profileImageWrapper.appendChild(profileImage);
  profileImage.alt = 'profile image';
  profileImage.src = !!pictureURL ? pictureURL : maskIcon;
  if (!pictureURL) {
    profileImage.style.padding = '.5rem';
  }

  editImageButton.innerHTML = `<i class="fas fa-plus"></i>`;
  profileImageWrapper.appendChild(editImageButton);

  profileImage.addEventListener('error', () => {
    profileImage.src = maskIcon;
    profileImage.style.padding = '.5rem';
  })

  displayInfoSection.appendChild(profileImageWrapper);
  displayInfoSection.appendChild(displayNameWrapper);


  return { displayInfoSection }
}

function handleFileInput(e) {
  const imgElement = document.querySelector('.profileImage')
  const fileInput = e.target;
  if (e.target.validity.valid) {
    const userFile = fileInput.files[0];
    if (validateFileSize(userFile)) {
      imgElement.src = URL.createObjectURL(userFile);
    }
  }
}

function validateFileSize(file) {
  return (file.size < 1048576)
}
