import {
  getUserConfirmedAgeCookie,
  setConfirmUsersAgeCookie,
} from '../../services/cookieStorage.js';

import agePopupContent from './agePopup.html';
import './agePopup.css';

const agePopup = () => {
  const userConfirmedAgeCookie = getUserConfirmedAgeCookie();
  if (userConfirmedAgeCookie === null || !JSON.parse(userConfirmedAgeCookie)) {
    return agePopupContent;
  } else {
    return '';
  }
};

const element = document.getElementById('agePopup');
if (element) {
  document.getElementById('agePopup').innerHTML = agePopup();

  const hidePopup = () => {
    element.style.display = 'none';
  };

  const yesBtn = document.querySelector('.yes-btn');
  if (yesBtn) {
    yesBtn.addEventListener('click', function () {
      setConfirmUsersAgeCookie();
      hidePopup();
    });
  }

  const noBtn = document.querySelector('.no-btn');
  if (noBtn) {
    noBtn.addEventListener('click', function () {
      // don't do anything yet
    });
  }
}
