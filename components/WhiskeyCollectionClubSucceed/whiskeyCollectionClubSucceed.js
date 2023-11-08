import { goToHome } from '../../services/urlSearchParams.js';

const whiskeyCollectionClubContent = `
<link rel="stylesheet" href="./components/WhiskeyCollectionClubSucceed/whiskeyCollectionClubSucceed.css" />
<div class="whiskey-collection-club-succeed" data-no-select>
    <div id="whiskey-collection-club-thanks" class="whiskey-collection-club-thanks">
        <h2 class="h2 thanks">Thank you for subscribing!</h2>
        <p class="thanks-text body-medium-large">Congratulations! You have successfully subscribed to the Whiskey-Collection. We are glad that you are ready to become part of our community.</p>

        <h2 class="h2 next">What’s next?</h2>
        <p class="next-text body-medium-large">We will contact you as soon as possible, when all things will be done from our side.</p>

        <button class="back-home-btn body-semibold" data-no-select>Back to home</button>
    </div>
    <img src="./components/WhiskeyCollectionClubContent/whiskeybottle.svg" title="Join our Whiskey-Collection club" alt="Bottle of whiskey" />
</div>`;

const element = document.getElementById('whiskeyCollectionClubSucceed');
if (element) {
  element.innerHTML = whiskeyCollectionClubContent;
}

async function handleClick() {
  goToHome();
}

document.querySelector('.back-home-btn').addEventListener('click', function () {
  handleClick();
});