import { goToWhiskeyCollectionClub } from '../../services/urlSearchParams.js';

const response = await fetch('./components/Header/header.html');
const htmlContent = await response.text();

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = htmlContent;
}

document
  .querySelector('.join-our-club-btn')
  .addEventListener('click', function () {
    goToWhiskeyCollectionClub();
  });
