import { goToWhiskeyCollectionClub } from '../../services/urlSearchParams.js';

const header = `
<link rel="stylesheet" href="./components/Header/header.css" />
<div class="main-header" data-no-select>
  <a href="/" class="header-logo">
    <img src="./components/Header/logo-dark-text.svg" title="Whiskey collection logo" alt="Glass of whiskey" />
  </a>
  <div class="special-offer">
    <button class="join-our-club-btn body-semibold" data-no-select>Join our club</button>
  </div>
</div>`;

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = header;
}

document
  .querySelector('.join-our-club-btn')
  .addEventListener('click', function () {
    goToWhiskeyCollectionClub();
  });
