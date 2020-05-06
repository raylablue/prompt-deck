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

function App() {
  useAuth();

  return (
    <>
      <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
