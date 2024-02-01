import headerContent from './header.html';
import './header.css';

import { getWithExpiry } from '../../services/localStorage';

import { googleSignIn, signOut } from '../../services/firebase.js';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;

  const signInWrapper = document.querySelector('.sign-in-wrapper');
  const signOutWrapper = document.querySelector('.sign-out-wrapper');

  const callbackAction = () => {
    const isAuthenticated = getWithExpiry('userName');
    if (isAuthenticated) {
      signOutWrapper.style.display = 'flex';
      signInWrapper.style.display = 'none';
    } else {
      signInWrapper.style.display = 'flex';
      signOutWrapper.style.display = 'none';
    }
  };

  callbackAction();

  signInWrapper.addEventListener('click', function () {
    googleSignIn(callbackAction);
  });

  signOutWrapper.addEventListener('click', function () {
    signOut(callbackAction);
  });
}
