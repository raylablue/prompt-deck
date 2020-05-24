import React from 'react';
import * as firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../redux/actions/set-user/set-user.action';

export const USER_LOCAL_STORAGE_KEY = 'user';

function useAuth() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserAction(user));
          localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
        } else {
          dispatch(setUserAction(null));
          localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }
      });
  }, [dispatch]);
}

export default useAuth;
