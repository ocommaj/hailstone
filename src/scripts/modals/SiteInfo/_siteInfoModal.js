import ModalBase from '../_modalBase';
import PrivacyPolicy from './_privacyPolicy';
import TermsOfService from './_termsOfService';

const MODAL_ID = "siteInfo"

export default function SiteInfoModal() {
  const modalConf = { id: MODAL_ID, hasAuthUI: false };
  const { modal, reveal, remove, replace } = ModalBase(modalConf);
  const { privacyPolicy } = PrivacyPolicy();
  const { termsOfService } = TermsOfService();

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('contentWrapper');

  const siteInfoContent = document.createElement('div');
  siteInfoContent.classList.add('siteInfoContent');

  const headline = document.createElement('h1');
  headline.innerHTML = "About";

  siteInfoContent.appendChild(privacyPolicy);
  siteInfoContent.appendChild(termsOfService);
  contentWrapper.appendChild(siteInfoContent);

  modal.appendChild(headline);
  modal.appendChild(contentWrapper);

  return {
    reveal,
    remove,
    replace,
    id: modal.id,
    element: modal,
  }
}
