export default function DetailInfoSection({
  familyName, givenName, primaryContact
}) {
  const detailInfoSectionWrapper = document.createElement('div');
  detailInfoSectionWrapper.classList.add('profileViewSectionWrapper');

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

  nameElementsWrapper.appendChild(firstNameWrapper);
  nameElementsWrapper.appendChild(lastNameWrapper);

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

  return { detailInfoSection: detailInfoSectionWrapper }
}
