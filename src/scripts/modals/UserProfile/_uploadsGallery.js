import GalleryImage from '../../components/_galleryImage';

export default function UploadsGallery({ uploadRecords }) {
  const uploadsSectionWrapper = document.createElement('div');
  uploadsSectionWrapper.id = 'uploadsSectionWrapper';
  uploadsSectionWrapper.classList.add('profileViewSectionWrapper');

  const uploadSectionLabel = document.createElement('h3');
  const uploadSectionLabelText = document.createTextNode('Your Photos:');
  uploadSectionLabel.id = 'uploadSectionLabel';
  uploadSectionLabel.classList.add('profileViewLabel');
  uploadSectionLabel.appendChild(uploadSectionLabelText);

  uploadsSectionWrapper.appendChild(uploadSectionLabel);

  loadImages(uploadRecords, uploadsSectionWrapper);

  return { uploadsSection: uploadsSectionWrapper };
}

function loadImages(uploadRecords, wrapperElement) {
  if (!uploadRecords) {
    wrapperElement.appendChild(altText())
    return
  }
  const { firebaseClient: { loadImagesFromDB } } = window;
  const domCallback = (config) => {
    config.applauseButton=false;
    wrapperElement.append(GalleryImage(config))
  }

  const sortedRecords = sortUploadRecords(uploadRecords);
  for (const [wreckID, imgIDs] of Object.entries(sortedRecords)) {
    loadImagesFromDB({
      domCallback,
      gallery: wreckID,
      filterIDs: imgIDs
    });
  }

  function altText() {
    const uploadSectionAltText = document.createElement('h3');
    const uploadSectionAltTextValue = document
      .createTextNode('Photos you post will appear here.');
    uploadSectionAltText.id = 'uploadSectionAltText';
    uploadSectionAltText.classList.add('profileViewValue');
    uploadSectionAltText.appendChild(uploadSectionAltTextValue);
    return uploadSectionAltText;
  }

  function sortUploadRecords(uploadRecords) {
    return uploadRecords.reduce((accumulator, record) => {
      if (!accumulator[record.wreckId]) {
        accumulator[record.wreckId] = [record.imgId];
      } else {
        accumulator[record.wreckId].push(record.imgId);
      }
      return accumulator;
    }, {})
  }
}
