import React from 'react';
import * as firebase from 'firebase';

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }

        setIsFirebaseLoaded(true);
      });

    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isFirebaseLoaded,
  };
}

export default useAuth;
