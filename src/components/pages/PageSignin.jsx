import React, { useEffect } from 'react';
import Header from '../organisms/Header';
import uiConfig from '../../firebase/uiConfig';
import firebase from '../../firebase/firebase';

function Signin() {
  useEffect(() => {
    firebase.ui.start('#firebase-sign-in', uiConfig);
  }, []);

  return (
    <div>
      <Header />
      <h1>Sign In</h1>

      <div id="firebase-sign-in" />
    </div>
  );
}

export default Signin;
