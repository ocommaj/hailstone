import ProfileField from './_profileField';

export default DetailInfoSection;

const primaryContactConfig = {
  fieldId: 'primaryContact',
  labelText: 'Primary Contact:',
  canEdit: false
}

const firstNameFieldConfig = {
  fieldId: 'firstName',
  labelText: 'First Name:',
  required: false
}

const lastNameFieldConfig = {
  fieldId: 'lastName',
  labelText: 'Family Name:',
  required: false
}

function DetailInfoSection(userData) {
  const { familyName, givenName, email, providerId, username } = userData;
  const primaryContact = providerId === 'twitter.com' ? username : email;

  primaryContactConfig.fieldContent = primaryContact;
  firstNameFieldConfig.fieldContent = givenName;
  lastNameFieldConfig.fieldContent = familyName;

  const primaryContactField = ProfileField(primaryContactConfig);
  const firstNameField = ProfileField(firstNameFieldConfig);
  const lastNameField = ProfileField(lastNameFieldConfig);

  const detailInfoSectionWrapper = document.createElement('div');
  detailInfoSectionWrapper.classList.add('profileViewSectionWrapper');

  const nameElementsWrapper = document.createElement('div');
  nameElementsWrapper.id = 'nameElementsWrapper';

  nameElementsWrapper.appendChild(firstNameField);
  nameElementsWrapper.appendChild(lastNameField);

  detailInfoSectionWrapper.appendChild(primaryContactField);
  detailInfoSectionWrapper.appendChild(nameElementsWrapper);

  return { detailInfoSection: detailInfoSectionWrapper }
}
