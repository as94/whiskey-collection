import { sendNotification } from '../../services/sendNotification.js';
import { goToWhiskeyCollectionClubSucceed } from '../../services/urlSearchParams.js';

const whiskeyCollectionClubContent = `
<link rel="stylesheet" href="./components/WhiskeyCollectionClubContent/whiskeyCollectionClubContent.css" />
<div class="whiskey-collection-club-content" data-no-select>
    <div id="whiskey-collection-club-offer" class="whiskey-collection-club-offer">
        <h1 class="h1 title">WHISKEY-COLLECTION CLUB</h1>
        <p class="welcome-text body-medium-large">Welcome to The Whiskey Collection, where whiskey passion, friendliness and intimate knowledge of the spirit come together. Our club is dedicated to celebrating the great art of whiskey making and its rich variety of flavours. It doesn't matter if you are an experienced connoisseur or just starting your journey in the world of whiskey, our club is open to everyone who appreciates this amazing drink.</p>

        <h2 class="h2 offer">What do we offer:</h2>
        <ul class="offer-list">
          <li class="body-medium-large">The ability to create your own whiskey collections in your personal account</li>
          <li class="body-medium-large">Leave comments for whiskey on our website</li>
          <li class="body-medium-large">Take part in our online meetings “let’s talk about whiskey”</li>
          <li class="body-medium-large">Be a member of our private chat, where you can be the first to learn about new whiskeys and discuss whiskey with other members of the whiskey club whenever you want</li>
          <li class="body-medium-large">Make new acquaintances and friends</li>
        </ul>

        <p class="call-to-action-text body-semibold-large">If you want to join us, just enter your email and we will contact you</p>
        <div class="call-to-action-block">
          <div class="email-container">
            <input id="email" class="email" type="text" placeholder="Enter your email" />
            <p id="email-error" class="error body-small">Email is not correct. Please, check that the field is email and not empty</p>
          </div>
            <button class="join-club-btn body-semibold" data-no-select>I want to join your club</button>
        </div>
    </div>
    <img src="./components/WhiskeyCollectionClubContent/whiskeybottle.svg" title="Join our Whiskey-Collection club" alt="Bottle of whiskey" />
</div>`;

const element = document.getElementById('whiskeyCollectionClubContent');
if (element) {
  element.innerHTML = whiskeyCollectionClubContent;
}

async function handleClick() {
  const email = document.querySelector('#email');
  const emailError = document.querySelector('#email-error');

  if (!email.value || !email.value.includes('@')) {
    emailError.style.display = 'block';
    emailError.textContent =
      'Email is not correct. Please, check that the field is email and not empty';
    email.classList.add('invalid');
    return;
  } else {
    emailError.style.display = 'none';
    email.classList.remove('invalid');
  }

  const succeed = await sendNotification(email.value);
  if (!succeed) {
    emailError.style.display = 'block';
    emailError.textContent =
      'Something goes wrong with sending email. Please, try later. You also can contact administrator whiskeycollections@gmail.com';
    return;
  }

  goToWhiskeyCollectionClubSucceed();
}

document.querySelector('.join-club-btn').addEventListener('click', function () {
  handleClick();
});
