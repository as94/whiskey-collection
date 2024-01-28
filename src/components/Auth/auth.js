import { logOut, signUp, signIn } from '../../services/firebase';

const element = document.getElementById('auth');
if (element) {
  // await signUp();
  // await signIn();
  await logOut();
}
