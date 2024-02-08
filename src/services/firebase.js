import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { setWithExpiry, twoWeeksExpiration } from './localStorage';

const firebaseConfig = {
  apiKey: 'AIzaSyAMb_3E4JAzBpXXXZs-K64XcRDE_rySA-Q',
  authDomain: 'whiskey-collection-6a699.firebaseapp.com',
  projectId: 'whiskey-collection-6a699',
  storageBucket: 'whiskey-collection-6a699.appspot.com',
  messagingSenderId: '729993787788',
  appId: '1:729993787788:web:6abf1a90a097fe2b0abea9',
  measurementId: 'G-MTF2SVP0KJ',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

export const googleSignIn = async callbackAction => {
  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);

  setWithExpiry('token', credential.accessToken, twoWeeksExpiration);
  setWithExpiry('userName', result.user.displayName, twoWeeksExpiration);
  setWithExpiry('userEmail', result.user.email, twoWeeksExpiration);

  if (callbackAction) {
    callbackAction();
  }
};

export const signOut = callbackAction => {
  signOutFirebase(auth);
  window.localStorage.clear();

  if (callbackAction) {
    callbackAction();
  }
};
