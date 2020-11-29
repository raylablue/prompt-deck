import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import uiConfig from '../../../firebase/uiConfig';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';

function PageSignIn() {
  const user = useSelector((state) => state.user);
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');

  useEffect(() => {
    if (!user) {
      try {
        firebase.ui.start('#firebase-sign-in', uiConfig);
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the requested data');
      }
    }
  }, [user]);

  return (
    <TemplateDefault>
      <If condition={defaultErrMessage.length >= 1}>
        <ErrorMessage
          defaultErrMessage={defaultErrMessage}
          errMessage={errMessage}
        />

        <Else>

          <If condition={!user}>
            <div
              data-test="signin-widget"
              className="container"
            >
              <h1>Sign In</h1>
              <div id="firebase-sign-in" />
            </div>

            <Else>
              <div
                data-test="already-signed-in-message"
              >
                <h2>You are already signed in</h2>
                <p className="bg-white">
                  thanks for setting up your account. Sadly not much
                  left to do here unless you would like to log out so
                  you can sign back in again.
                </p>
              </div>
            </Else>
          </If>

        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PageSignIn;
