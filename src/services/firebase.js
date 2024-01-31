import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
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

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const googleSignIn = () => {
  setWithExpiry('loginInProgress', 'true', twoWeeksExpiration);
  signInWithRedirect(auth, provider);
};

export const signOut = () => {
  signOutFirebase(auth);
  window.localStorage.clear();
  location.reload();
};

export const handleSignInResult = async () => {
  const isAuthenticated = getWithExpiry('token');
  if (isAuthenticated) {
    return;
  }

  const loginInProgress = getWithExpiry('loginInProgress');

  if (loginInProgress) {
    try {
      const result = await getRedirectResult(auth);

      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        setWithExpiry('token', token, twoWeeksExpiration);
        setWithExpiry('userName', user.displayName, twoWeeksExpiration);
        setWithExpiry('userEmail', user.email, twoWeeksExpiration);
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
    } finally {
      remove('loginInProgress');
    }
  }
};
