import { goToHome } from '../../services/urlSearchParams.js';

const response = await fetch(
  './components/WhiskeyCollectionClubSucceed/whiskeyCollectionClubSucceed.html'
);
const htmlContent = await response.text();

const element = document.getElementById('whiskeyCollectionClubSucceed');
if (element) {
  element.innerHTML = htmlContent;
}

async function handleClick() {
  goToHome();
}

document.querySelector('.back-home-btn').addEventListener('click', function () {
  handleClick();
});
