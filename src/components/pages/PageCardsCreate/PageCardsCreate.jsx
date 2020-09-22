import React from 'react';
import { If, Else } from 'react-if';
import { useHistory } from 'react-router';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CardForm from '../../organisms/CardForm/CardForm';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function PageCardsCreate() {
  const initialCard = {};
  const history = useHistory();

  async function handleCreateCard(newCard) {
    try {
      await firebase.db.collection('cards').add(newCard);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    history.push('/cards');
  }

  return (
    <TemplateDefault
      data-test="page-create-cards"
      className="row"
    >
      <h1>Create Cards Page</h1>
      <If condition={!initialCard}>
        <LoadingAnim />

        <Else>
          <CardForm
            initialCard={initialCard}
            handleSubmit={handleCreateCard}
            content="Create"
          />
        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageCardsCreate;
