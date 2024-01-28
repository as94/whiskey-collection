import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { setWithExpiry } from '../services/localStorage';

// move to secrets
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
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const signIn = () => {
  signInWithRedirect(auth, provider);
};

try {
  const result = await getRedirectResult(auth);

  if (result) {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;

    // two weeks expiration
    const ttl = 14 * 24 * 60 * 60 * 1000;
    setWithExpiry('token', token, ttl);

    console.log('result', result);
    console.log('credential', credential);
    console.log('token', token);
    console.log('user', user);
  } else {
    console.log('result is empty');
  }
} catch (error) {
  console.log('error', error);
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   const email = error.customData.email;
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   console.log('errorCode', errorCode);
  //   console.log('errorMessage', errorMessage);
  //   console.log('email', email);
  //   console.log('credential', credential);
}

export const signOut = () => {
  signOutFirebase(auth);
  window.localStorage.removeItem('token');
  location.reload();
};
