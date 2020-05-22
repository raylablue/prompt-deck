import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../organisms/Header/Header';
import uiConfig from '../../../firebase/uiConfig';
import firebase from '../../../firebase/firebase';

function PageSignIn() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      firebase.ui.start('#firebase-sign-in', uiConfig);
    }
  }, [user]);

  if (user) {
    return (
      <div
        data-test=""
      >
        <Header />
        <h2>You are already signed in</h2>
        <p>
          thanks for setting up your account. Sadly not much
          left to do here unless you would like to log out so
          you can sign back in again.
        </p>
      </div>
    );
  }

  return (
    <div
      data-test=""
    >
      <Header />
      <h1>Sign In</h1>
      <div id="firebase-sign-in" />
    </div>
  );
}

export default PageSignIn;