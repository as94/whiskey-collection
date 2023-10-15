import {
  getUserConfirmedAgeCookie,
  setConfirmUsersAgeCookie,
} from '../../services/cookieStorage.js';

const component = `
<link rel="stylesheet" href="./components/AgePopup/agePopup.css" />
<div class="age-popup-background" id="age-popup-background">
    <div class="age-popup">
        <h1 class="h1">Whiskey Collection</h1>
        <h2 class="h2">Welcome! You must be +18 to enter</h2>
        <h3 class="h3">Are you 18 years old or older?</h3>
        <div class="answers">
            <button class="yes-btn body-semibold" data-no-select>Yes</button>
            <button class="no-btn body-semibold" data-no-select>No</button>
        </div>
        <img src="./components/AgePopup/logo-light-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
    </div>
</div>
`;

const agePopup = () => {
  const userConfirmedAgeCookie = getUserConfirmedAgeCookie();
  if (userConfirmedAgeCookie === null || !JSON.parse(userConfirmedAgeCookie)) {
    return component;
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
