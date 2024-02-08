import headerContent from './header.html';
import './header.css';

import { getWithExpiry } from '../../services/localStorage';

import { googleSignIn, signOut } from '../../services/firebase.js';

export const authCallbackAction = () => {
  const signInWrapper = document.querySelector('.sign-in-wrapper');
  const signOutWrapper = document.querySelector('.sign-out-wrapper');
  const isAuthenticated = getWithExpiry('userName');
  if (isAuthenticated) {
    signOutWrapper.style.display = 'flex';
    signInWrapper.style.display = 'none';
  } else {
    signInWrapper.style.display = 'flex';
    signOutWrapper.style.display = 'none';
  }
};

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;

  const signInWrapper = document.querySelector('.sign-in-wrapper');
  const signOutWrapper = document.querySelector('.sign-out-wrapper');

  authCallbackAction();

  signInWrapper.addEventListener('click', function () {
    googleSignIn(authCallbackAction);
  });

  signOutWrapper.addEventListener('click', function () {
    signOut(authCallbackAction);
  });
}
