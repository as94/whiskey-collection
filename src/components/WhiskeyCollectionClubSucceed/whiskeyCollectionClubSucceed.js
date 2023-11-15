import { goToHome } from '../../services/urlSearchParams.js';
import whiskeyCollectionClubSucceedContent from './whiskeyCollectionClubSucceed.html';
import './whiskeyCollectionClubSucceed.css';

const element = document.getElementById('whiskeyCollectionClubSucceed');
if (element) {
  element.innerHTML = whiskeyCollectionClubSucceedContent;
}

async function handleClick() {
  goToHome();
}

document.querySelector('.back-home-btn').addEventListener('click', function () {
  handleClick();
});
