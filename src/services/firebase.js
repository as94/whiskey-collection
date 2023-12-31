import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';

const email = 'kseniamakeko@gmail.com';
const password = 'qwe123qwe';

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

// register algorithm:
// 1. ask for email, password
// 2. register user
// 3. authenticate user (auto)
// 4. ask for approving email address
// 5. get approved email address
// 6. show results

// sign in algorithm
// 1. ask for email, password
// 2. sign in user
// 3. authenticate user (auto)
// 4. ask for approving email address (if never before)
// 5. get approved email address (if never before)
// 6. show results

// reset password

// sign out

export const logOut = async () => {
  await signOut(auth);
  window.localStorage.removeItem('accessToken');
};

export const signUp = async () => {
  const actionCodeSettings = {
    url: 'http://localhost:8080/',
    handleCodeInApp: true,
  };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await sendEmailVerification(user, actionCodeSettings);
    console.log('user registered', user);
    window.localStorage.setItem('accessToken', user.accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async signUp => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log('user loged in', user);

    window.localStorage.setItem('accessToken', user.accessToken);
  } catch (error) {
    console.log(error);
  }
};
