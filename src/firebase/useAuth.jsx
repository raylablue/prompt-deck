import React from 'react';
import * as firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

export const USER_LOCAL_STORAGE_KEY = 'user';

function useAuth() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUser(user));
          localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
        } else {
          dispatch(setUser(null));
          localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }
      });

    return () => unsubscribe();
  }, [dispatch]);
}

export default useAuth;
