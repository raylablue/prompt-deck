import app from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.db = app.firestore();
  }

  async logout() {
    await this.auth.signOut();
  }
}
const firebase = new Firebase();

export default firebase;
