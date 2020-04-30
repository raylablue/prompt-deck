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
  const user = useAuth();
  return (
    <>
      <Router>
        <FirebaseContext.Provider value={{ user, firebase }}>
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
