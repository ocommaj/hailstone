import DetailInfoSection from './_detailInfoSection';
import ProfileModalButtons from './_profileButtons';
import TopSection from './_displayInfoSection';
import UploadsGallery from './_uploadsGallery';

export default function UserProfileView(userData) {
  const {
    displayName,
    email,
    familyName,
    givenName,
    uploadRecords,
    pictureURL,
    providerId,
    username
  } = userData;

  const primaryContact = providerId === 'twitter.com' ? username : email;
  const displaySectionArgs = { displayName, pictureURL };
  const detailInfoSectionArgs = { familyName, givenName, primaryContact };

  const { displayInfoSection } = TopSection(displaySectionArgs);
  const { detailInfoSection } = DetailInfoSection(detailInfoSectionArgs);
  const { uploadsSection } = UploadsGallery({ uploadRecords });
  const { profileModalButtonsWrapper } = ProfileModalButtons();

  const userProfileView = document.createElement('div');
  const profileElementsWrapper = document.createElement('div');
  const profileContentElements = document.createElement('div');

  const headline = document.createElement('h2');
  headline.classList.add('userProfileHeadline');
  headline.innerHTML = "Profile Information";
  profileContentElements.appendChild(headline);

  userProfileView.tabIndex = -1;
  profileElementsWrapper.tabIndex = -1;
  profileContentElements.tabIndex = -1;

  userProfileView.classList.add('userProfileView');
  profileElementsWrapper.classList.add('profileElementsWrapper');
  profileContentElements.classList.add('profileContentElements');

  profileContentElements.appendChild(displayInfoSection);
  profileContentElements.appendChild(detailInfoSection);
  profileContentElements.appendChild(uploadsSection);

  profileElementsWrapper.appendChild(profileContentElements);
  userProfileView.appendChild(profileElementsWrapper);
  userProfileView.appendChild(profileModalButtonsWrapper);

  return { userProfileView }
}
