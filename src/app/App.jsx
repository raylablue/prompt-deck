import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import Home from '../components/pages/PageHome';
import SignIn from '../components/pages/PageSignIn';
import useAuth from '../firebase/useAuth';

function App() {
  useAuth();

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
