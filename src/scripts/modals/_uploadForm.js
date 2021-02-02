export default function UploadForm() {
  const uploader = document.createElement('div');
  const uploadForm = document.createElement('form');

  const selectFileButton = document.createElement('input');
  const selectFileLabel = document.createElement('h3');

  const captionInput = document.createElement('textarea');
  const captionInputLabel = document.createElement('h3');

  const cameraDetails = document.createElement('input');
  const cameraDetailsLabel = document.createElement('h3');

  const submitButton = document.createElement('button');
  const submitButtonLabel = document.createElement('h3');

  uploader.classList.add('modalUploader');

  uploadForm.id = "imageUploadDetails";

  selectFileButton.classList.add('fileUploadButton');
  selectFileButton.type = 'file';
  selectFileButton.name = "Image File";
  selectFileButton.accept= "image/png, image/jpeg";
  selectFileButton.required="true";

  selectFileLabel.classList.add('fileUploadFormLabel');
  selectFileLabel.innerHTML='Select Image';

  captionInput.classList.add('imageCaptionInput');
  captionInput.placeholder = '(Optional)';
  captionInputLabel.classList.add('fileUploadFormInput');
  captionInputLabel.innerHTML='Image Caption'

  cameraDetailsLabel.classList.add('cameraDetailsLabel');
  cameraDetailsLabel.innerHTML='Camera Details'

  cameraDetails.classList.add('cameraSettingsInput');
  cameraDetails.type = 'text';
  cameraDetails.placeholder = '(Optional)';

  submitButton.classList.add('fileUploadButton', 'submitButton')
  submitButton.innerHTML = 'Submit Upload';
  submitButton.id="submitButton"

  submitButtonLabel.classList.add('fileUploadFormLabel')
  submitButtonLabel.innerHTML='Upload File'

  uploadForm.appendChild(selectFileLabel)
  uploadForm.appendChild(selectFileButton)

  uploadForm.appendChild(cameraDetailsLabel)
  uploadForm.appendChild(cameraDetails)

  uploadForm.appendChild(captionInputLabel)
  uploadForm.appendChild(captionInput)

  uploadForm.appendChild(submitButtonLabel)
  uploadForm.appendChild(submitButton)

  uploader.appendChild(uploadForm)
  //uploadForm.appendChild(caption)
  //uploadForm.appendChild(cameraDetails)
  //uploadForm.style.visibility = 'hidden';
  return uploader;

}
