import ProfileField from './_profileField';
import ProfilePicture from './_profilePicture';

export default function DisplayInfoSection(userData) {
  const { displayName } = userData;

  const displayNameConfig = {
    fieldId: 'displayName',
    fieldContent: displayName,
    labelText: 'Display Name:'
  }

  const displayNameField = ProfileField(displayNameConfig);
  const { profilePicture } = ProfilePicture(userData);

  const displayInfoSection = document.createElement('div');
  displayInfoSection.classList.add('profileViewSectionWrapper');
  displayInfoSection.id = 'displayInfoSectionWrapper';

  displayInfoSection.appendChild(profilePicture);
  displayInfoSection.appendChild(displayNameField);

  return { displayInfoSection }
}
