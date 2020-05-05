import React from 'react';
import * as firebase from 'firebase';

function getUserFromLocalStorage() {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
}

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    setAuthUser(getUserFromLocalStorage());

    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setAuthUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          setAuthUser(null);
          localStorage.removeItem('user');
        }
      });

    return () => unsubscribe();
  }, []);

  return {
    authUser,
  };
}

export default useAuth;
