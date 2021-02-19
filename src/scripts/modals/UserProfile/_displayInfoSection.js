import ProfilePicture from './_profilePicture';

export default function DisplayInfoSection(userData) {
  const { displayName } = userData;
  const { profilePicture } = ProfilePicture(userData);

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

  displayInfoSection.appendChild(profilePicture);
  displayInfoSection.appendChild(displayNameWrapper);


  return { displayInfoSection }
}
