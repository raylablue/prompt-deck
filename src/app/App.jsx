import React, { useCallback, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import { useDispatch } from 'react-redux';
import PageHome from '../components/pages/PageHome/PageHome';
import PageSignIn from '../components/pages/PageSignIn/PageSignIn';
import useAuth from '../firebase/useAuth';
import PageCards from '../components/pages/PageCards/PageCards';
import PageCardsEdit from '../components/pages/PageCardsEdit/PageCardsEdit';
import PageCardsCreate from '../components/pages/PageCardsCreate/PageCardsCreate';
import firebase from '../firebase/firebase';
import { setTypesAction } from '../redux/actions/set-types/set-types.action';
import PageDecks from '../components/pages/PageDecks/PageDecks';
import PageDecksCreate from '../components/pages/PageDecksCreate/PageDecksCreate';
import PageDecksEdit from '../components/pages/PageDecksEdit/PageDecksEdit';
import PagePrompts from '../components/pages/PagePropmts/PagePropmts';
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
          <Route path="/signin">
            <PageSignIn />
          </Route>

          <Route path="/prompts">
            <PagePrompts />
          </Route>

          <Route path="/cards">
            <PageCards />
          </Route>

          <Route path="/cards-edit/:id">
            <PageCardsEdit />
          </Route>

          <Route path="/cards-create">
            <PageCardsCreate />
          </Route>

          <Route path="/decks">
            <PageDecks />
          </Route>

          <Route path="/decks-edit/:id">
            <PageDecksEdit />
          </Route>

          <Route path="/decks-create">
            <PageDecksCreate />
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
