import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import Home from '../components/pages/PageHome';
import Signin from '../components/pages/PageSignin';
import useAuth from '../firebase/useAuth';
import FirebaseContext from '../firebase/context';
import firebase from '../firebase/firebase';

function App() {
  const { authUser } = useAuth();
  const firebaseContextValue = {
    user: authUser,
    firebase,
  };

  return (
    <>
      <Router>
        <FirebaseContext.Provider value={firebaseContextValue}>
          <Switch>
            <Route path="/signin">
              <Signin />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </FirebaseContext.Provider>
      </Router>
    </>
  );
}

export default App;
