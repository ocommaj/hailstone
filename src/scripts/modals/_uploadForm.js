import CustomDropdown from './_customDropdown';

const selectImageInput = {
  id: 'userImageFile',
}
const cameraDetails = {
  id: 'inputCameraDetails',
  labelText: 'Camera Details',
}

const captionInput = {
  id: 'inputImageCaption',
  labelText: 'Image Caption',
  isTextArea: true,
}

const submitButton = {
  id: 'submitButton',
  labelText: 'Upload Image',
}

const diveOperators = {
  id: 'inputDiveOperators',
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
  uploader.classList.add('wrappedModalContent');

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
  input.id = `${id}`;
  input.placeholder = !!optional ? '(Optional)' : required;

  fragment.appendChild(label);
  fragment.appendChild(input);
  return fragment;
}

function ProgressBar() {
  const progressBar = document.createElement('progress');
  progressBar.value = 0;
  progressBar.max = 100;
  progressBar.id = 'uploadProgressBar';
  return progressBar
}

function SubmitButton({ id, labelText }) {
  const fragment = document.createDocumentFragment();
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');
  const label = document.createElement('h3');

  label.classList.add('fileUploadFormLabel');
  label.id = `${id}Label`;
  label.innerHTML = labelText;

  buttonWrapper.classList.add('submitButtonWrapper');
  button.classList.add(id);
  button.id = id;
  button.type = "submit";
  button.innerHTML = labelText;

  button.addEventListener('click', clickHandler)

  buttonWrapper.appendChild(button)
  buttonWrapper.appendChild( ProgressBar() )
  fragment.appendChild(label);
  fragment.appendChild(buttonWrapper);
  return fragment;

  function clickHandler(e) {
    submitClickHandler(() => {
      revealProgressBar()
      e.target.removeEventListener('click', clickHandler);
      e.target.style.cursor = 'auto';
    })
  }
  function revealProgressBar() {
    const progressBar = buttonWrapper.children[1]
    progressBar.style.opacity = 1;
  }
}

function submitClickHandler(restyleButton) {
  // parse input values
  const { refreshModal, id: wreckId, element: modal } = window.activeModal;
  const storagePathRoot = `publicAssets/wrecks/${wreckId}`
  const fileInput = modal.querySelector('[type=file]');

  const progressBar = modal.querySelector('progress');
  const imageCaption = modal.querySelector('#inputImageCaption');
  const cameraDetails = modal.querySelector('#inputCameraDetails');
  const diveOperators = modal.querySelector('#inputDiveOperators');

  if (window.user.isAnonymous) {
    window.launchAuthUI()
    return
  }

  if (fileInput.validity.valid) {
    const userFile = fileInput.files[0];
    const storagePath = `${storagePathRoot}/${userFile.name}`
    const storageRecord = { userFile, storagePath }

    // create db record
    const dbCollection = `wreckGalleries/${wreckId}/images/`;
    const dbFields = {
      storagePath,
      imageCaption: imageCaption.value,
      cameraDetails: cameraDetails.value,
      diveOperators: diveOperators.value,
      upvotes: 0
    }

    const dbRecord = { dbCollection, dbFields }

    const onComplete = (docToAdd) => {
      refreshModal(docToAdd)
        .then(() => {
          const uploader = modal.querySelector('.modalUploader')
          uploader.style.opacity = 0;
          setTimeout(() => {
            progressBar.style.opacity = 0;
            progressBar.value = 0;
          }, 700)


          fileInput.value = ''
          imageCaption.value = ''
          cameraDetails.value = ''
        })
    }

    // style progressBar & button
    restyleButton()
    // upload file
    window.firebaseClient.uploader({
      storageRecord,
      dbRecord,
      progressBar,
      onComplete
     })
  }
}
