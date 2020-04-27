import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import Home from '../components/pages/PageHome';
import Signin from '../components/pages/PageSignin';
import Logout from '../components/pages/PageLogout';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/logout">
            <Logout />
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
