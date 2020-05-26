import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import PageHome from '../components/pages/PageHome/PageHome';
import PageSignIn from '../components/pages/PageSignIn/PageSignIn';
import useAuth from '../firebase/useAuth';

/* istanbul ignore file */

function App() {
  useAuth();

  return (
    <div
      data-test="component-app"
    >
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <PageSignIn />
          </Route>

          <Route path="/">
            <PageHome />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
