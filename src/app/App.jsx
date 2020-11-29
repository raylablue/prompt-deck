import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import { If } from 'react-if';
import { useDispatch } from 'react-redux';
import useAuth from '../firebase/useAuth';
import firebase from '../firebase/firebase';
import { setTypesAction } from '../redux/actions/set-types/set-types.action';
import Routes from './RoutesCollection';
import ErrorMessage from '../components/atoms/ErrorMessage/ErrorMessage';
/* istanbul ignore file */

function App() {
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');

  useAuth();
  const dispatch = useDispatch();

  const populateTypes = useCallback(
    async () => {
      try {
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
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the card types');
      }
    },
    [dispatch],
  );

  useEffect(() => {
    populateTypes();
  }, [populateTypes]);

  return (
    <div
      data-test="component-app"
      className="component-app"
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
      <If condition={defaultErrMessage.length >= 1}>
        <ErrorMessage
          defaultErrMessage={defaultErrMessage}
          errMessage={errMessage}
        />
      </If>
    </div>
  );
}

export default App;
