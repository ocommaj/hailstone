export default ProfileField;

function ProfileField(config) {
  const { fieldId,
          fieldContent,
          labelText,
          canEdit=true,
          required=true } = config;

  const profileField = document.createElement('div');

  const fieldLabel = document.createElement('h3');
  const labelContent = document.createTextNode(labelText);
  fieldLabel.appendChild(labelContent)

  const fieldValueInputWrapper = document.createElement('div');
  const fieldValue = document.createElement('h3');
  const fieldInput = document.createElement('input');

  fieldInput.type = 'text';
  fieldInput.value = fieldContent;
  fieldInput.required = required;

  profileField.id = `${fieldId}Wrapper`;
  fieldLabel.id = `${fieldId}Label`;
  fieldInput.id = `${fieldId}Input`;
  fieldValue.id = `${fieldId}Value`;

  fieldValueInputWrapper.classList.add('valueInputWrapper');
  fieldLabel.classList.add('profileViewLabel');
  fieldInput.classList.add('profileViewInput');
  fieldValue.classList.add('profileViewValue');

  fieldValue.innerHTML = `${fieldContent}`;

  fieldValueInputWrapper.appendChild(fieldValue);

  if (!!canEdit) fieldValueInputWrapper.appendChild(fieldInput);

  profileField.appendChild(fieldLabel);
  profileField.appendChild(fieldValueInputWrapper);

  return profileField;
}
