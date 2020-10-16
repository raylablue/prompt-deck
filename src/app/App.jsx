import React, { useCallback, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import { useDispatch } from 'react-redux';
import useAuth from '../firebase/useAuth';
import firebase from '../firebase/firebase';
import { setTypesAction } from '../redux/actions/set-types/set-types.action';
import Routes from './RoutesCollection';
/* istanbul ignore file */

function App() {
  useAuth();
  const dispatch = useDispatch();

  const populateTypes = useCallback(
    async () => {
      const response = await firebase.db
        .collection('types')
        .get();

      const typeData = response
        .docs
        .map((type) => ({
          id: type.id,
          ...type.data(),
        }));

      dispatch(setTypesAction(typeData));
    },
    [dispatch],
  );

  useEffect(() => {
    populateTypes();
  }, [populateTypes]);

  return (
    <div
      data-test="component-app"
    >
      <BrowserRouter>
        <Switch>
          {Routes.map((route) => (
            <Route path={route.path} key={route.component}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
