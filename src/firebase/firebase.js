import app from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import firebaseConfig from './config';
import uiConfig from './uiConfig';

// Initialize Firebase
app.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
