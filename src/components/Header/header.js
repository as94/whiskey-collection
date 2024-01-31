import headerContent from './header.html';
import './header.css';

import { getWithExpiry } from '../../services/localStorage';

import {
  googleSignIn,
  signOut,
  handleSignInResult,
} from '../../services/firebase.js';

const element = document.getElementById('mainHeader');
if (element) {
  element.innerHTML = headerContent;
  // const loadingWrapper = document.querySelector('.loading-wrapper');
  // loadingWrapper.style.display = 'flex';

  // // await handleSignInResult();

  // loadingWrapper.style.display = 'none';

  // const isAuthenticated = getWithExpiry('userName');

  // const signInWrapper = document.querySelector('.sign-in-wrapper');
  // const signOutWrapper = document.querySelector('.sign-out-wrapper');

  // if (isAuthenticated) {
  //   signOutWrapper.style.display = 'flex';
  // } else {
  //   signInWrapper.style.display = 'flex';
  // }

  // signInWrapper.addEventListener('click', function () {
  //   googleSignIn();
  // });

  // signOutWrapper.addEventListener('click', function () {
  //   signOut();
  // });
}
