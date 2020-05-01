import React, { useContext, useEffect } from 'react';
import Header from '../organisms/Header';
import uiConfig from '../../firebase/uiConfig';
import firebase from '../../firebase/firebase';
import FirebaseContext from '../../firebase/context';

function Signin() {
  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.ui.start('#firebase-sign-in', uiConfig);
  }, []);

  if (user) {
    return (
      <>
        <Header />
        <h2>You are already signed in</h2>
        <p>
          thanks for setting up your account. Sadly not much
          left to do here unless you would like to log out so
          you can sign back in again.
        </p>
      </>
    );
  }
  return (
    <div>
      <Header />
      <h1>Sign In</h1>

      <div id="firebase-sign-in" />
    </div>
  );
}

export default Signin;
