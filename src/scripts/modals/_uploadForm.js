import CustomDropdown from './_customDropdown';

const cameraDetails = {
  id: 'cameraDetails',
  labelText: 'Camera Details'
}

const captionInput = {
  id: 'captionInput',
  labelText: 'Image Caption',
  isTextArea: true
}

const submitButton = {
  id: 'submitButton',
  labelText: 'Upload Image'
}

const diveOperators = {
  id: 'diveOperators',
  labelText: 'Dive Operator',
  options: [
    { ref: 'blueLagoon', display: 'Blue Lagoon' },
    { ref: 'odyssey', display: 'M/V Odyssey' },
    { ref: 'trukMaster', display: 'M/Y Truk Master' },
    { ref: 'thorfinn', display: 'SS Thorfinn' },
    { ref: 'trukStop', display: 'Truk Stop'}
  ],
}

export default function UploadForm() {
  const uploader = document.createElement('div');
  const uploadForm = document.createElement('form');
  uploader.classList.add('modalUploader');
  uploadForm.id = "imageUploadDetails";

  uploadForm.appendChild( SelectFileButton() );
  uploadForm.appendChild( TextInput(cameraDetails) );
  uploadForm.appendChild( TextInput(captionInput) );
  uploadForm.appendChild( CustomDropdown(diveOperators) );
  uploadForm.appendChild( SubmitButton(submitButton) );

  uploader.appendChild(uploadForm)
  return uploader;
}

function SelectFileButton() {
  const fragment = document.createDocumentFragment()
  const selectFileButton = document.createElement('input');
  const selectFileLabel = document.createElement('h3');
  selectFileButton.classList.add('selectFileInput');
  selectFileButton.type = 'file';
  selectFileButton.name = "Image File";
  selectFileButton.accept= "image/png, image/jpeg";
  selectFileButton.required="true";

  selectFileLabel.classList.add('fileUploadFormLabel');
  selectFileLabel.innerHTML='Select File';

  fragment.appendChild(selectFileLabel)
  fragment.appendChild(selectFileButton)
  return fragment;
}

function TextInput({ id, labelText, isTextArea=false, optional=true }) {
  const fragment = document.createDocumentFragment()
  const input = document.createElement(!isTextArea ? 'input' : 'textarea');
  const label = document.createElement('h3');

  label.classList.add('fileUploadFormLabel');
  label.id = `${id}Label`;
  label.innerHTML = labelText;

  if (!isTextArea) input.type = 'text';
  input.id = `${id}Input`;
  input.placeholder = !!optional ? '(Optional)' : required;

  fragment.appendChild(label);
  fragment.appendChild(input);
  return fragment;
}

function SubmitButton({ id, labelText }) {
  const fragment = document.createDocumentFragment();
  const button = document.createElement('button');
  const label = document.createElement('h3');

  label.classList.add('fileUploadFormLabel');
  label.id = `${id}Label`;
  label.innerHTML = labelText;

  button.classList.add(id);
  button.id=id;
  button.innerHTML = labelText;

  fragment.appendChild(label);
  fragment.appendChild(button);
  return fragment;
}
