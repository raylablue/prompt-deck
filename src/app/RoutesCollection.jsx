import React from 'react';
import PageSignIn from '../components/pages/PageSignIn/PageSignIn';
import PagePrompts from '../components/pages/PagePropmts/PagePrompts';
import PageDecks from '../components/pages/PageDecks/PageDecks';
import PageDecksEdit from '../components/pages/PageDecksEdit/PageDecksEdit';
import PageDecksCreate from '../components/pages/PageDecksCreate/PageDecksCreate';
import PageHome from '../components/pages/PageHome/PageHome';
import PageCardsCreate from '../components/pages/PageCardsCreate/PageCardsCreate';
import PageCardsEdit from '../components/pages/PageCardsEdit/PageCardsEdit';
import PageCards from '../components/pages/PageCards/PageCards';
import PagePromptDeck from '../components/pages/PagePromptDeck/PagePromptDeck';

/* istanbul ignore file */

const Routes = [
  {
    path: '/signin',
    component: <PageSignIn />,
  },
  {
    path: '/prompts/:id',
    component: <PagePromptDeck />,
  },
  {
    path: '/prompts',
    component: <PagePrompts />,
  },
  {
    path: '/cards/create',
    component: <PageCardsCreate />,
  },
  {
    path: '/cards/:id',
    component: <PageCardsEdit />,
  },
  {
    path: '/cards',
    component: <PageCards />,
  },
  {
    path: '/decks/create',
    component: <PageDecksCreate />,
  },
  {
    path: '/decks/:id',
    component: <PageDecksEdit />,
  },
  {
    path: '/decks',
    component: <PageDecks />,
  },
  {
    path: '/',
    component: <PageHome />,
  },

];

export default Routes;
