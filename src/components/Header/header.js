import { goToWhiskeyCollectionClub } from '../../services/urlSearchParams.js';
import headerContent from './header.html';
import './header.css';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;
}

document
  .querySelector('.join-our-club-btn')
  .addEventListener('click', function () {
    goToWhiskeyCollectionClub();
  });
