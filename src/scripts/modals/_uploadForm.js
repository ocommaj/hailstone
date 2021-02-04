import CustomDropdown from './_customDropdown';

const selectImageInput = {
  id: 'userImageFile',
}
const cameraDetails = {
  id: 'cameraDetails',
  labelText: 'Camera Details',
}

const captionInput = {
  id: 'imageCaption',
  labelText: 'Image Caption',
  isTextArea: true,
}

const submitButton = {
  id: 'submitButton',
  labelText: 'Upload Image',
}

const diveOperators = {
  id: 'diveOperators',
  labelText: 'Dive Operator',
  options: [
    { ref: '', display: '(Optional)' },
    { ref: 'blueLagoon', display: 'Blue Lagoon' },
    { ref: 'odyssey', display: 'M/V Odyssey' },
    { ref: 'trukMaster', display: 'M/Y Truk Master' },
    { ref: 'thorfinn', display: 'SS Thorfinn' },
    { ref: 'trukStop', display: 'Truk Stop'}
  ],
}

export default function UploadForm() {
  const uploader = document.createElement('div');
  uploader.classList.add('modalUploader');


  uploader.appendChild( SelectFileButton(selectImageInput) );
  uploader.appendChild( TextInput(cameraDetails) );
  uploader.appendChild( TextInput(captionInput) );
  uploader.appendChild( CustomDropdown(diveOperators) );
  uploader.appendChild( SubmitButton(submitButton) );

  return uploader;
}

function SelectFileButton({ id }) {
  const fragment = document.createDocumentFragment()
  const selectFileButton = document.createElement('input');
  const selectFileLabel = document.createElement('h3');
  selectFileButton.classList.add('selectFileInput');
  selectFileButton.type = 'file';
  selectFileButton.name = "Image File";
  selectFileButton.accept= "image/png, image/jpeg";
  selectFileButton.required="true";
  selectFileButton.id=id;
  selectFileButton.setAttribute('form', null);

  selectFileLabel.classList.add('fileUploadFormLabel');
  selectFileLabel.innerText='Choose File';

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
  input.id = `${id}UserInput`;
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
  button.id = id;
  button.type = "submit";
  button.innerHTML = labelText;

  button.addEventListener('click', submitClickHandler)

  fragment.appendChild(label);
  fragment.appendChild(button);
  return fragment;
}

function submitClickHandler(e) {
  const { id: wreckId } = window.activeModal;
  const fileInput = e.target.parentElement.querySelector('[type=file]');
  const userFile = fileInput.files[0];
  //const inputs = [...button.parentElement.querySelectorAll('input')]
  //inputs.push(...button.parentElement.querySelectorAll('textarea'))
  //inputs.push(...button.parentElement.querySelectorAll('select'))
  //const { form } = button;
  /*const values = inputs.map(element => {
    const { value, id } = element;
    return { value, id }
  })*/

  window.firebaseClient.uploader({ file: userFile, parentGallery: wreckId })

}
