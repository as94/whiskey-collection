import { sendNotification } from '../../services/sendNotification.js';
import { goToWhiskeyCollectionClubSucceed } from '../../services/urlSearchParams.js';

const response = await fetch(
  './components/WhiskeyCollectionClubContent/whiskeyCollectionClubContent.html'
);
const htmlContent = await response.text();

const element = document.getElementById('whiskeyCollectionClubContent');
if (element) {
  element.innerHTML = htmlContent;
}

async function handleClick() {
  const email = document.querySelector('#email');
  const emailError = document.querySelector('#email-error');

  if (!email.value || !email.value.includes('@')) {
    emailError.style.display = 'block';
    emailError.textContent =
      'Email is not correct. Please, check that the field is email and not empty';
    email.classList.add('invalid');

    email.addEventListener('keyup', function () {
      emailError.style.display = 'none';
      email.classList.remove('invalid');
    });

    return;
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
