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

function App() {
  useAuth();

  return (
    <>
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
    </>
  );
}

export default App;
