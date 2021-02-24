import DetailInfoSection from './_detailInfoSection';
import ProfileModalButtons from './_profileButtons';
import TopSection from './_displayInfoSection';
import UploadsGallery from './_uploadsGallery';

export default function UserProfileView(userData) {
  const { modalHeadline } = ModalHeadline();
  const { displayInfoSection } = TopSection(userData);
  const { detailInfoSection } = DetailInfoSection(userData);
  const { uploadsSection } = UploadsGallery(userData);
  const { profileModalButtonsWrapper } = ProfileModalButtons();

  const userProfileView = document.createElement('div');
  const profileElementsWrapper = document.createElement('div');
  const profileContentElements = document.createElement('div');

  userProfileView.tabIndex = -1;
  profileElementsWrapper.tabIndex = -1;
  profileContentElements.tabIndex = -1;

  userProfileView.id = 'userProfileView';
  userProfileView.classList.add('userProfileView');
  profileElementsWrapper.classList.add('profileElementsWrapper');
  profileContentElements.classList.add('profileContentElements');

  profileContentElements.appendChild(modalHeadline);
  profileContentElements.appendChild(displayInfoSection);
  profileContentElements.appendChild(detailInfoSection);
  profileContentElements.appendChild(uploadsSection);

  profileElementsWrapper.appendChild(profileContentElements);
  userProfileView.appendChild(profileElementsWrapper);
  userProfileView.appendChild(profileModalButtonsWrapper);

  return { userProfileView }
}

function ModalHeadline() {
  const modalHeadline = document.createElement('h2');
  modalHeadline.classList.add('userProfileHeadline');
  modalHeadline.innerHTML = "Profile Information";
  return { modalHeadline };
}
