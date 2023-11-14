import { goToWhiskeyCollectionClub } from '../../services/urlSearchParams.js';

import headerContent from './header.html';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;
}

document
  .querySelector('.join-our-club-btn')
  .addEventListener('click', function () {
    goToWhiskeyCollectionClub();
  });
