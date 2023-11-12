import {
  getUserConfirmedAgeCookie,
  setConfirmUsersAgeCookie,
} from '../../services/cookieStorage.js';

const response = await fetch('./components/AgePopup/agePopup.html');
const htmlContent = await response.text();

const agePopup = () => {
  const userConfirmedAgeCookie = getUserConfirmedAgeCookie();
  if (userConfirmedAgeCookie === null || !JSON.parse(userConfirmedAgeCookie)) {
    return htmlContent;
  } else {
    return '';
  }
};

const returnToReferringSite = () => {
  const referringSite = document.referrer;

  if (referringSite) {
    window.location.href = referringSite;
  } else {
    window.location.href = 'https://www.google.com';
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
      hidePopup();
      returnToReferringSite();
    });
  }
}
