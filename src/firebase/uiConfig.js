import * as firebase from 'firebase';

const uiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // signInSuccessWithAuthResult(authResult) {
  //   const { user } = authResult;
  //   const { credential } = authResult.credential;
  //   const { isNewUser } = authResult.additionalUserInfo.isNewUser;
  //   const { providerId } = authResult.additionalUserInfo.providerId;
  // },
  signInSuccessUrl: '/',
};

export default uiConfig;
