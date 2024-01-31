import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as signOutFirebase,
} from 'firebase/auth';
import {
  setWithExpiry,
  getWithExpiry,
  twoWeeksExpiration,
  remove,
} from './localStorage';

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

// auth.onAuthStateChanged(user => {
//   const isAuthenticated = getWithExpiry('userName');
//   if (isAuthenticated) {
//     return;
//   }

//   getRedirectResult(auth)
//     .then(result => {
//       if (result) {
//         const credential = GoogleAuthProvider.credentialFromResult(result);

//         setWithExpiry('token', credential.accessToken, twoWeeksExpiration);
//         setWithExpiry('userName', result.user.displayName, twoWeeksExpiration);
//         setWithExpiry('userEmail', result.user.email, twoWeeksExpiration);
//       } else {
//         setWithExpiry('userName', user.displayName, twoWeeksExpiration);
//         setWithExpiry('userEmail', user.email, twoWeeksExpiration);
//       }
//     })
//     .catch(error => {
//       console.error('Error authenticating user:', error);
//     })
//     .finally(() => {
//       remove('loginInProgress');
//     });
// });

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const googleSignIn = async () => {
  // setWithExpiry('loginInProgress', 'true', twoWeeksExpiration);
  // signInWithRedirect(auth, provider);

  const result = await signInWithPopup(auth, provider);

  const credential = GoogleAuthProvider.credentialFromResult(result);

  setWithExpiry('token', credential.accessToken, twoWeeksExpiration);
  setWithExpiry('userName', result.user.displayName, twoWeeksExpiration);
  setWithExpiry('userEmail', result.user.email, twoWeeksExpiration);
};

export const signOut = () => {
  signOutFirebase(auth);
  window.localStorage.clear();
  location.reload();
};

export const handleSignInResult = async () => {};
