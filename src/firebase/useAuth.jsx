import React from 'react';
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

function getUserFromLocalStorage() {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
}

function useAuth() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setUser(getUserFromLocalStorage()));

    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUser(user));
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          dispatch(setUser(null));
          localStorage.removeItem('user');
        }
      });

    return () => unsubscribe();
  }, []);
}

export default useAuth;
